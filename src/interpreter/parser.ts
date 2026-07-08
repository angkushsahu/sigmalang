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
            // Gang instead of class
            if (this.match("GANG")) {
                return this.classDeclaration();
            }

            // Funk instead of function
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
        const name = this.consume(
            "IDENTIFIER",
            "The gang needs a name, not mystery lore. Identity theft isn't a language feature."
        );

        let superClass: VariableExpr | null = null;
        if (this.match("LESS")) {
            this.consume("IDENTIFIER", "The family tree has no ancestors. Expected og-class name.");
            superClass = { kind: "Variable", name: this.previous() };
        }

        this.consume(
            "LEFT_BRACE",
            "Bro built a house with no front door. Expected '{' before class body."
        );

        const methods: Array<FuncStmt> = [];
        while (!this.check("RIGHT_BRACE") && !this.isAtEnd()) {
            methods.push(this.func("method"));
        }

        this.consume("RIGHT_BRACE", "Braces matchmaking failed. '}' never showed up.");

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

        // Bounce instead of Return
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
        this.consume(
            "LEFT_PAREN",
            "The 'for' is buffering. '(' never loaded. Expected '(' after 'for'."
        );

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

        this.consume(
            "SEMICOLON",
            "Lil bro thinks semicolons are optional. It's not Python bro. Expected ';' after loop condition."
        );

        let increment: Expr | null = null;
        if (!this.check("RIGHT_PAREN")) {
            increment = this.expression();
        }

        this.consume(
            "RIGHT_PAREN",
            "The 'for' loop portal is still wide open. Expected ')' after for clauses."
        );

        let body = this.statement();

        if (increment) {
            body = {
                kind: "Block",
                statements: [body, { kind: "Expression", expression: increment }]
            };
        }

        if (condition === null) {
            condition = { kind: "Literal", value: true } as LiteralExpr;
        }

        body = { kind: "While", condition, body };

        if (initializer !== null && initializer !== undefined) {
            body = { kind: "Block", statements: [initializer, body] };
        }

        return body;
    }

    private ifStatement(): IfStmt {
        this.consume(
            "LEFT_PAREN",
            "The 'if' is waiting for its opening bracket arc. Expected '(' after 'if'."
        );
        const condition = this.expression();
        this.consume(
            "RIGHT_PAREN",
            "The 'if' condition is trapped. ')' never came back with the milk. Expected ')' after if condition."
        );

        const thenBranch = this.statement();
        let elseBranch: Stmt | null = null;

        if (this.match("ELSE")) {
            elseBranch = this.statement();
        }

        return { kind: "If", thenBranch, elseBranch, condition };
    }

    private printStatement(): PrintStmt {
        const value = this.expression();
        this.consume(
            "SEMICOLON",
            "Lil bro thinks statements end with vibes. This ain't Python bro. Expected ';' after value."
        );
        return { kind: "Print", expression: value };
    }

    private returnStatement(): ReturnStmt {
        const keyword = this.previous();
        let value: Expr | null = null;

        if (!this.check("SEMICOLON")) {
            value = this.expression();
        }

        this.consume(
            "SEMICOLON",
            "This ain't Python bro, please have some respect. Expected ';' after return value."
        );
        return { kind: "Return", keyword, value };
    }

    private varDeclaration(): VarStmt {
        const name = this.consume(
            "IDENTIFIER",
            "Lil bro declared a variable in incognito mode. Expected variable name."
        );

        let initializer: Expr | null = null;
        if (this.match("EQUAL")) {
            initializer = this.expression();
        }

        this.consume(
            "SEMICOLON",
            "This ain't Python bro, please have some respect. Expect ';' after variable declaration"
        );
        return { kind: "Var", name, initializer };
    }

    private whileStatement(): WhileStmt {
        this.consume(
            "LEFT_PAREN",
            "Bro said 'while' and expected the compiler to fill in the lore. Expected '(' after 'while'."
        );
        const condition = this.expression();

        this.consume(
            "RIGHT_PAREN",
            "The condition escaped containment. ')' never caught it. Expected ')' after condition."
        );
        const body = this.statement();

        return { kind: "While", condition, body };
    }

    private expressionStatement(): ExprStmt {
        const expr = this.expression();
        this.consume(
            "SEMICOLON",
            "This ain't Python bro, please have some respect. Expected ';' after expression."
        );
        return { kind: "Expression", expression: expr };
    }

    private func(kind: string): FuncStmt {
        const name = this.consume(
            "IDENTIFIER",
            `Please name '${kind}' something. You don't have to be creative.`
        );
        this.consume(
            "LEFT_PAREN",
            `Bro thinks the parameter list is optional DLC. Expected '(' after ${kind} name.`
        );

        const params: Array<Token> = [];

        if (!this.check("RIGHT_PAREN")) {
            do {
                if (params.length >= 255) {
                    this.error(
                        this.peek(),
                        "Bro is hosting the Avengers in one function call. Cannot have more than 255 arguments."
                    );
                }

                params.push(
                    this.consume(
                        "IDENTIFIER",
                        "Bro invited a parameter and forgot its name. Expected parameter name."
                    )
                );
            } while (this.match("COMMA"));
        }

        this.consume(
            "RIGHT_PAREN",
            "The parameters are still in the group chat. ')' never ended the meeting. Expected ')' after parameters."
        );

        this.consume("LEFT_BRACE", `Expect '{' before ${kind} body. Stop being NPC dude.`);

        const body = this.block();
        return { kind: "Function", body, name, params };
    }

    private block() {
        const statements: Array<Stmt> = [];

        while (!this.check("RIGHT_BRACE") && !this.isAtEnd()) {
            const decl = this.declaration();
            if (decl) {
                statements.push(decl);
            }
        }

        this.consume(
            "RIGHT_BRACE",
            "The '{' is still waiting for its beloved. Expected '}' after block."
        );

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
                return { kind: "Set", object: expr.object, name: expr.name, value };
            }

            this.error(
                equals,
                "Bro tried assigning to something that ain't assignable. Invalid assignment target."
            );
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
        let expr = this.comparison();

        while (this.match("BANG_EQUAL", "EQUAL_EQUAL")) {
            const operator = this.previous();
            const right = this.comparison();

            expr = { kind: "Binary", left: expr, operator, right };
        }

        return expr;
    }

    private comparison() {
        let expr = this.term();

        while (this.match("GREATER", "GREATER_EQUAL", "LESS", "LESS_EQUAL")) {
            const operator = this.previous();
            const right = this.term();
            expr = { kind: "Binary", left: expr, operator, right };
        }

        return expr;
    }

    private term() {
        let expr = this.factor();

        while (this.match("MINUS", "PLUS")) {
            const operator = this.previous();
            const right = this.factor();
            expr = { kind: "Binary", left: expr, operator, right };
        }

        return expr;
    }

    private factor() {
        let expr = this.unary();

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
                    this.error(
                        this.peek(),
                        "Bro is hosting the Avengers in one function call. Cannot have more than 255 arguments."
                    );
                }

                args.push(this.expression());
            } while (this.match("COMMA"));
        }

        const paren = this.consume(
            "RIGHT_PAREN",
            "The function call is still taking attendance. ')' never showed up. Expected ')' after arguments."
        );

        return { kind: "Call", callee, paren, args };
    }

    private call() {
        let expr = this.primary();

        while (true) {
            if (this.match("LEFT_PAREN")) {
                expr = this.finishCall(expr);
            } else if (this.match("DOT")) {
                const name = this.consume(
                    "IDENTIFIER",
                    "The '.' is looking for its soulmate: a property name."
                );
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
        // Npc instead of Nil
        if (this.match("NPC")) {
            return { kind: "Literal", value: null };
        }

        if (this.match("NUMBER", "STRING")) {
            return { kind: "Literal", value: this.previous().literal };
        }

        if (this.match("OG")) {
            const keyword = this.previous();
            this.consume("DOT", "Bro typed 'og' and called it a day. Expected '.'");
            const method = this.consume(
                "IDENTIFIER",
                "Brain.exe stopped. Expected a og-class method name."
            );
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
            this.consume("RIGHT_PAREN", "Parenthesis matchmaking failed. ')' never showed up.");
            return { kind: "Grouping", expression: expr };
        }

        throw this.error(this.peek(), "Skibidi syntax detected. Expected an expression.");
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
                case "GANG": // "class"
                case "FUNK": // "function"
                case "AURA": // var
                case "FOR":
                case "IF":
                case "SPAM": // while
                case "YAP": // print
                case "BOUNCE": // return
                    return;
            }

            this.advance();
        }
    }
}
