import type {
    AssignExpr,
    BinaryExpr,
    BlockStmt,
    CallExpr,
    ClassStmt,
    Expr,
    FuncStmt,
    GetExpr,
    GroupingExpr,
    IfStmt,
    LogicalExpr,
    ReturnStmt,
    SetExpr,
    Stmt,
    SuperExpr,
    ThisExpr,
    VariableExpr,
    VarStmt,
    WhileStmt
} from "./type";
import type { Interpreter } from "./interpreter";
import type { RuntimeOutput } from "./output";
import type { Token } from "./token";

type FunctionType = "NONE" | "FUNCTION" | "INITIALIZER" | "METHOD";
type ClassType = "NONE" | "CLASS" | "SUBCLASS";

export class Resolver {
    private readonly interpreter: Interpreter;
    private readonly scopes: Array<Record<string, boolean>>;
    private currentFunction: FunctionType;
    private currentClass: ClassType;
    private output: RuntimeOutput;

    constructor(interpreter: Interpreter, output: RuntimeOutput) {
        this.interpreter = interpreter;
        this.output = output;
        this.scopes = [];
        this.currentFunction = "NONE";
        this.currentClass = "NONE";
    }

    resolve(statements: Array<Stmt>) {
        for (const statement of statements) {
            this.resolveStmt(statement);
        }
    }

    private resolveStmt(stmt: Stmt) {
        switch (stmt.kind) {
            case "Block":
                return this.resolveBlockStmt(stmt);

            case "Class":
                return this.resolveClassStmt(stmt);

            case "Expression":
                return this.resolveExpr(stmt.expression);

            case "Print":
                return this.resolveExpr(stmt.expression);

            case "Var":
                return this.resolveVarStmt(stmt);

            case "Function":
                return this.resolveFuncStmt(stmt);

            case "If":
                return this.resolveIfStmt(stmt);

            case "While":
                return this.resolveWhileStmt(stmt);

            case "Return":
                return this.resolveReturnStmt(stmt);
        }
    }

    private resolveExpr(expr: Expr): void {
        switch (expr.kind) {
            case "Assign":
                return this.resolveAssignExpr(expr);

            case "Binary":
                return this.resolveBinaryExpr(expr);

            case "Call":
                return this.resolveCallExpr(expr);

            case "Get":
                return this.resolveGetExpr(expr);

            case "Grouping":
                return this.resolveGroupingExpr(expr);

            case "Literal":
                return;

            case "Logical":
                return this.resolveLogicalExpr(expr);

            case "Set":
                return this.resolveSetExpr(expr);

            case "Super":
                return this.resolveSuperExpr(expr);

            case "This":
                return this.resolveThisExpr(expr);

            case "Unary":
                return this.resolveExpr(expr.right);

            case "Variable":
                return this.resolveVariableExpr(expr);
        }
    }

    private resolveBlockStmt(stmt: BlockStmt) {
        this.beginScope();
        this.resolve(stmt.statements);
        this.endScope();
    }

    private resolveClassStmt(stmt: ClassStmt) {
        const enclosingClass = this.currentClass;
        this.currentClass = "CLASS";

        this.declare(stmt.name);
        this.define(stmt.name);

        if (stmt.superClass && stmt.name.lexeme === stmt.superClass.name.lexeme) {
            this.output.tokenError(
                stmt.superClass.name,
                "The class looked in the mirror and said, 'That's my parent.' A class cannot inherit from itself."
            );
        }

        if (stmt.superClass) {
            this.currentClass = "SUBCLASS";
            this.resolveExpr(stmt.superClass);
        }

        if (stmt.superClass) {
            this.beginScope();
            if (this.scopes.length >= 1) {
                this.scopes[this.scopes.length - 1]["super"] = true;
            }
        }

        this.beginScope();
        if (this.scopes.length >= 1) {
            this.scopes[this.scopes.length - 1]["this"] = true;
        }

        for (const method of stmt.methods) {
            let declaration: FunctionType = "METHOD";

            if (method.name.lexeme === "init") {
                declaration = "INITIALIZER";
            }

            this.resolveFunction(method, declaration);
        }

        this.endScope();

        if (stmt.superClass) {
            this.endScope();
        }

        this.currentClass = enclosingClass;
    }

    private resolveFuncStmt(stmt: FuncStmt) {
        this.declare(stmt.name);
        this.define(stmt.name);

        this.resolveFunction(stmt, "FUNCTION");
    }

    private resolveIfStmt(stmt: IfStmt) {
        this.resolveExpr(stmt.condition);
        this.resolveStmt(stmt.thenBranch);

        if (stmt.elseBranch !== null && stmt.elseBranch !== undefined) {
            this.resolveStmt(stmt.elseBranch);
        }
    }

    private resolveReturnStmt(stmt: ReturnStmt) {
        if (this.currentFunction === "NONE") {
            this.output.tokenError(
                stmt.keyword,
                "Return to where? We never left. Cannot return from top-level code."
            );
        }

        if (stmt.value !== null && stmt.value !== undefined) {
            if (this.currentFunction == "INITIALIZER") {
                this.output.tokenError(
                    stmt.keyword,
                    "The initializer is not a cashback scheme. Cannot return a value from an initializer."
                );
            }

            this.resolveExpr(stmt.value);
        }
    }

    private resolveVarStmt(stmt: VarStmt) {
        this.declare(stmt.name);

        if (stmt.initializer) {
            this.resolveExpr(stmt.initializer);
        }

        this.define(stmt.name);
    }

    private resolveWhileStmt(stmt: WhileStmt) {
        this.resolveExpr(stmt.condition);
        this.resolveStmt(stmt.body);
    }

    private resolveAssignExpr(expr: AssignExpr) {
        this.resolveExpr(expr.value);
        this.resolveLocal(expr, expr.name);
    }

    private resolveBinaryExpr(expr: BinaryExpr) {
        this.resolveExpr(expr.left);
        this.resolveExpr(expr.right);
    }

    private resolveCallExpr(expr: CallExpr) {
        this.resolveExpr(expr.callee);

        for (const arg of expr.args) {
            this.resolveExpr(arg);
        }
    }

    private resolveGetExpr(expr: GetExpr) {
        this.resolveExpr(expr.object);
    }

    private resolveGroupingExpr(expr: GroupingExpr) {
        this.resolveExpr(expr.expression);
    }

    private resolveLogicalExpr(expr: LogicalExpr) {
        this.resolveExpr(expr.left);
        this.resolveExpr(expr.right);
    }

    private resolveSetExpr(expr: SetExpr) {
        this.resolveExpr(expr.value);
        this.resolveExpr(expr.object);
    }

    private resolveSuperExpr(expr: SuperExpr) {
        if (this.currentClass === "NONE") {
            this.output.tokenError(
                expr.keyword,
                "Bro dialed the family hotline with no family plan. Cannot use 'og' outside of a class."
            );
        } else if (this.currentClass !== "SUBCLASS") {
            this.output.tokenError(
                expr.keyword,
                "Bro called 'og' with no family to back him up. Cannot use 'og' outside of a class."
            );
        }

        this.resolveLocal(expr, expr.keyword);
    }

    private resolveThisExpr(expr: ThisExpr) {
        if (this.currentClass === "NONE") {
            this.output.tokenError(
                expr.keyword,
                "Lil bro is having an identity crisis. Cannot use 'me' outside of a class."
            );
            return;
        }

        this.resolveLocal(expr, expr.keyword);
    }

    private resolveVariableExpr(expr: VariableExpr) {
        if (
            this.scopes.length !== 0 &&
            this.scopes[this.scopes.length - 1][expr.name.lexeme] === false
        ) {
            this.output.tokenError(
                expr.name,
                "Bro asked the unborn variable for life advice. Cannot read local variable in its own initializer."
            );
        }

        this.resolveLocal(expr, expr.name);
    }

    private resolveFunction(func: FuncStmt, type: FunctionType) {
        const enclosingFunction = this.currentFunction;
        this.currentFunction = type;

        this.beginScope();

        for (const param of func.params) {
            this.declare(param);
            this.define(param);
        }

        this.resolve(func.body);
        this.endScope();

        this.currentFunction = enclosingFunction;
    }

    private beginScope() {
        this.scopes.push({});
    }

    private endScope() {
        this.scopes.pop();
    }

    private declare(name: Token) {
        if (this.scopes.length === 0) {
            return;
        }

        const scope = this.scopes[this.scopes.length - 1];
        if (Object.hasOwn(scope, name.lexeme)) {
            this.output.tokenError(
                name,
                "Identity theft isn't a language feature. Already a variable with this name in this scope."
            );
        }

        scope[name.lexeme] = false;
    }

    private define(name: Token) {
        if (this.scopes.length === 0) {
            return;
        }

        const scope = this.scopes[this.scopes.length - 1];
        scope[name.lexeme] = true;
    }

    private resolveLocal(expr: Expr, name: Token) {
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (Object.hasOwn(this.scopes[i], name.lexeme)) {
                this.interpreter.resolve(expr, this.scopes.length - 1 - i);
                return;
            }
        }
    }
}
