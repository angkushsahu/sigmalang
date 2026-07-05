import type {
    CallExpr,
    ClassStmt,
    Expr,
    ExprStmt,
    FuncStmt,
    IfStmt,
    LiteralExpr,
    PrintStmt,
    ReturnStmt,
    Stmt,
    VariableExpr,
    VarStmt,
    WhileStmt
} from "./type";
import type { RuntimeOutput } from "./output";
import type { TokenType } from "./token-type";
import type { Token } from "./token";

import { ParseError } from "./error";

export class Parser {
    private readonly tokens: Array<Token>;
    private current: number;
    private output: RuntimeOutput;

    constructor(tokens: Array<Token>, output: RuntimeOutput) {
        this.tokens = tokens;
        this.output = output;
        this.current = 0;
    }

    parse(): Array<Stmt> {
        const statements: Array<Stmt> = [];

        while (!this.isAtEnd()) {
            const decl = this.declaration();
            if (decl) {
                statements.push(decl);
            }
        }

        return statements;
    }

    private expression() {
        return this.assignment();
    }

    private declaration() {
        try {
            if (this.match("GANG")) {
                return this.classDeclaration();
            }

            if (this.match("FUNK")) {
                return this.func("function");
            }

            // Aura instead of Var
            if (this.match("AURA")) {
                return this.varDeclaration();
            }

            return this.statement();
        } catch {
            this.synchronize();
            return null;
        }
    }

    private classDeclaration(): ClassStmt {
        const name = this.consume("IDENTIFIER", "Expect class name.");

        let superClass: VariableExpr | null = null;
        if (this.match("LESS")) {
            this.consume("IDENTIFIER", "Expect superclass name.");
            superClass = { kind: "Variable", name: this.previous() };
        }

        this.consume("LEFT_BRACE", "Expect '{' before class body.");

        const methods = [];
        while (!this.check("RIGHT_BRACE") && !this.isAtEnd()) {
            methods.push(this.func("method"));
        }

        this.consume("RIGHT_BRACE", "Expect '}' after class body.");

        return { kind: "Class", methods, name, superClass };
    }

    private statement(): Stmt {
        if (this.match("FOR")) {
            return this.forStatement();
        }

        if (this.match("IF")) {
            return this.ifStatement();
        }

        // Yap instead of Print
        if (this.match("YAP")) {
            return this.printStatement();
        }

        if (this.match("BOUNCE")) {
            return this.returnStatement();
        }

        // Spam instead of While
        if (this.match("SPAM")) {
            return this.whileStatement();
        }

        if (this.match("LEFT_BRACE")) {
            return { kind: "Block", statements: this.block() };
        }

        return this.expressionStatement();
    }

    private forStatement() {
        this.consume("LEFT_PAREN", "Expect '(' after 'for'.");

        let initializer: Stmt | null = null;
        if (this.match("SEMICOLON")) {
            initializer = null;
            // Aura instead of Var
        } else if (this.match("AURA")) {
            initializer = this.varDeclaration();
        } else {
            initializer = this.expressionStatement();
        }

        let condition: Expr | null = null;
        if (!this.check("SEMICOLON")) {
            condition = this.expression();
        }

        this.consume("SEMICOLON", "Expect ';' after loop condition.");

        let increment: Expr | null = null;
        if (!this.check("RIGHT_PAREN")) {
            increment = this.expression();
        }

        this.consume("RIGHT_PAREN", "Expect ')' after for clauses.");

        let body = this.statement();

        if (increment) {
            body = {
                kind: "Block",
                statements: [body, { kind: "Expression", expression: increment }]
            };
        }

        if (!condition) {
            condition = { kind: "Literal", value: true } as LiteralExpr;
        }

        body = { kind: "While", condition, body };

        if (initializer !== null && initializer !== undefined) {
            body = { kind: "Block", statements: [initializer, body] };
        }

        return body;
    }

    private ifStatement(): IfStmt {
        this.consume("LEFT_PAREN", "Expect '(' after 'if'.");
        const condition = this.expression();
        this.consume("RIGHT_PAREN", "Expect ')' after if condition.");

        const thenBranch = this.statement();
        let elseBranch: Stmt | null = null;

        if (this.match("ELSE")) {
            elseBranch = this.statement();
        }

        return { kind: "If", thenBranch, elseBranch, condition };
    }

    private printStatement(): PrintStmt {
        const value = this.expression();
        this.consume("SEMICOLON", "Expect ';' after value.");
        return { kind: "Print", expression: value };
    }

    private returnStatement(): ReturnStmt {
        const keyword = this.previous();
        let value: Expr | null = null;

        if (!this.check("SEMICOLON")) {
            value = this.expression();
        }

        this.consume("SEMICOLON", "Expect ';' after return value.");
        return { kind: "Return", keyword, value };
    }

    private varDeclaration(): VarStmt {
        const name = this.consume("IDENTIFIER", "Expect variable name.");

        let initializer: Expr | null = null;
        if (this.match("EQUAL")) {
            initializer = this.expression();
        }

        this.consume("SEMICOLON", "Expect ';' after variable declaration");
        return { kind: "Var", name, initializer };
    }

    private whileStatement(): WhileStmt {
        this.consume("LEFT_PAREN", "Expect '(' after 'while'.");
        const condition = this.expression();

        this.consume("RIGHT_PAREN", "Expect ')' after condition.");
        const body = this.statement();

        return { kind: "While", condition, body };
    }

    private expressionStatement(): ExprStmt {
        const expr = this.expression();
        this.consume("SEMICOLON", "Expect ';' after expression.");
        return { kind: "Expression", expression: expr };
    }

    private func(kind: string): FuncStmt {
        const name = this.consume("IDENTIFIER", `Expect ${kind} name.`);
        this.consume("LEFT_PAREN", `Expect '(' after ${kind} name.`);

        const parameters: Array<Token> = [];

        if (!this.check("RIGHT_PAREN")) {
            do {
                if (parameters.length >= 255) {
                    this.error(this.peek(), "Cannot have more than 255 parameters.");
                }

                parameters.push(this.consume("IDENTIFIER", "Expect parameter name."));
            } while (this.match("COMMA"));
        }

        this.consume("RIGHT_PAREN", "Expect ')' after parameters.");
        this.consume("LEFT_BRACE", `Expect '{' before ${kind} body.`);

        const body = this.block();
        return { kind: "Function", body, name, params: parameters };
    }

    private block() {
        const statements: Array<Stmt> = [];

        while (!this.check("RIGHT_BRACE") && !this.isAtEnd()) {
            const decl = this.declaration();
            if (decl) {
                statements.push(decl);
            }
        }

        this.consume("RIGHT_BRACE", "Expect '}' after block.");
        return statements;
    }

    private assignment(): Expr {
        const expr = this.or();

        if (this.match("EQUAL")) {
            const equals = this.previous();
            const value = this.assignment();

            if (expr.kind === "Variable") {
                const name = expr.name;
                return { kind: "Assign", name, value };
            } else if (expr.kind === "Get") {
                const get = expr;
                return { kind: "Set", object: get.object, name: get.name, value };
            }

            this.error(equals, "Invalid assignment target.");
        }

        return expr;
    }

    private or() {
        let expr = this.and();

        while (this.match("OR")) {
            const operator = this.previous();
            const right = this.and();
            expr = { kind: "Logical", left: expr, right, operator };
        }

        return expr;
    }

    private and() {
        let expr = this.equality();

        while (this.match("AND")) {
            const operator = this.previous();
            const right = this.equality();
            expr = { kind: "Logical", left: expr, right, operator };
        }

        return expr;
    }

    private equality() {
        let expr: Expr = this.comparison();

        while (this.match("BANG_EQUAL", "EQUAL_EQUAL")) {
            const operator = this.previous();
            const right = this.comparison();

            expr = { kind: "Binary", left: expr, operator, right };
        }

        return expr;
    }

    private comparison() {
        let expr: Expr = this.term();

        while (this.match("GREATER", "GREATER_EQUAL", "LESS", "LESS_EQUAL")) {
            const operator = this.previous();
            const right = this.term();
            expr = { kind: "Binary", left: expr, operator, right };
        }

        return expr;
    }

    private term() {
        let expr: Expr = this.factor();

        while (this.match("MINUS", "PLUS")) {
            const operator = this.previous();
            const right = this.factor();
            expr = { kind: "Binary", left: expr, operator, right };
        }

        return expr;
    }

    private factor() {
        let expr: Expr = this.unary();

        while (this.match("SLASH", "STAR")) {
            const operator = this.previous();
            const right = this.unary();
            expr = { kind: "Binary", left: expr, operator, right };
        }

        return expr;
    }

    private unary(): Expr {
        if (this.match("BANG", "MINUS")) {
            const operator = this.previous();
            const right = this.unary();
            return { kind: "Unary", operator, right };
        }

        return this.call();
    }

    private finishCall(callee: Expr): CallExpr {
        const args: Array<Expr> = [];
        if (!this.check("RIGHT_PAREN")) {
            do {
                if (args.length >= 255) {
                    this.error(this.peek(), "Cannot have more than 255 arguments.");
                }

                args.push(this.expression());
            } while (this.match("COMMA"));
        }

        const paren = this.consume("RIGHT_PAREN", "Expect ')' after arguments.");

        return { kind: "Call", callee, paren, args };
    }

    private call() {
        let expr = this.primary();

        while (true) {
            if (this.match("LEFT_PAREN")) {
                expr = this.finishCall(expr);
            } else if (this.match("DOT")) {
                const name = this.consume("IDENTIFIER", "Expect property name after '.'.");
                expr = { kind: "Get", name, object: expr };
            } else {
                break;
            }
        }

        return expr;
    }

    private primary(): Expr {
        // Cap instead of False
        if (this.match("CAP")) {
            return { kind: "Literal", value: false };
        }
        // Fax instead of True
        if (this.match("FAX")) {
            return { kind: "Literal", value: true };
        }
        if (this.match("NPC")) {
            return { kind: "Literal", value: null };
        }

        if (this.match("NUMBER", "STRING")) {
            return { kind: "Literal", value: this.previous().literal };
        }

        if (this.match("OG")) {
            const keyword = this.previous();
            this.consume("DOT", "Expect '.' after 'super'.");
            const method = this.consume("IDENTIFIER", "Expect superclass method name.");
            return { kind: "Super", keyword, method };
        }

        if (this.match("ME")) {
            return { kind: "This", keyword: this.previous() };
        }

        if (this.match("IDENTIFIER")) {
            return { kind: "Variable", name: this.previous() };
        }

        if (this.match("LEFT_PAREN")) {
            const expr = this.expression();
            this.consume("RIGHT_PAREN", "Expect ')' after expression.");
            return { kind: "Grouping", expression: expr };
        }

        throw this.error(this.peek(), "Expect expression.");
    }

    private match(...types: Array<TokenType>) {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }

        return false;
    }

    private consume(type: TokenType, message: string) {
        if (this.check(type)) {
            return this.advance();
        }

        throw this.error(this.peek(), message);
    }

    private check(type: TokenType) {
        if (this.isAtEnd()) {
            return false;
        }

        return this.peek().type === type;
    }

    private advance() {
        if (!this.isAtEnd()) {
            this.current += 1;
        }
        return this.previous();
    }

    private isAtEnd() {
        return this.peek().type === "EOF";
    }

    private peek() {
        return this.tokens[this.current];
    }

    private previous() {
        return this.tokens[this.current - 1];
    }

    private error(token: Token, message: string) {
        this.output.tokenError(token, message);
        return new ParseError();
    }

    private synchronize() {
        this.advance();

        while (!this.isAtEnd()) {
            if (this.previous().type === "SEMICOLON") {
                return;
            }

            switch (this.peek().type) {
                case "GANG":
                case "FUNK":
                // case "VAR":
                case "AURA":
                case "FOR":
                case "IF":
                // case "WHILE":
                case "SPAM":
                // case "PRINT":
                case "YAP":
                case "BOUNCE":
                    return;
            }

            this.advance();
        }
    }
}
