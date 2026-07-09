import type {
    AssignExpr,
    BinaryExpr,
    BlockStmt,
    CallExpr,
    ClassStmt,
    Expr,
    FuncStmt,
    GetExpr,
    IfStmt,
    LiteralValue,
    LogicalExpr,
    PrintStmt,
    ReturnStmt,
    SetExpr,
    Stmt,
    SuperExpr,
    UnaryExpr,
    VarStmt,
    WhileStmt
} from "./type";
import type { RuntimeOutput } from "./output";
import type { Callable } from "./callable";
import type { Token } from "./token";

import { HaltError, ReturnError, RuntimeError } from "./error";
import { Environment } from "./environment";
import { Instance } from "./instance";
import { Func } from "./function";
import { Klass } from "./class";
import { Clock } from "./utils";

const LOOP_LIMIT = 100_000;

export class Interpreter {
    private environment: Environment;
    readonly globals: Environment;
    private locals: Map<Expr, number>;
    private output: RuntimeOutput;
    private executionSteps: number;

    constructor(output: RuntimeOutput) {
        this.globals = new Environment(null);
        this.environment = this.globals;
        this.locals = new Map();
        this.output = output;
        this.executionSteps = 0;

        this.globals.define("clock", new Clock());
    }

    interpret(statements: Array<Stmt>) {
        try {
            for (const statement of statements) {
                this.execute(statement);
            }
        } catch (error: unknown) {
            if (error instanceof RuntimeError) {
                this.output.runtimeError(error);
            }
        }
    }

    private evaluate(expr: Expr): LiteralValue {
        switch (expr.kind) {
            case "Literal":
                return expr.value;

            case "Binary":
                return this.evaluateBinary(expr);

            case "Unary":
                return this.evaluateUnary(expr);

            case "Grouping":
                return this.evaluate(expr.expression);

            case "Assign":
                return this.evaluateAssign(expr);

            case "Call":
                return this.evaluateCall(expr);

            case "Logical":
                return this.evaluateLogical(expr);

            case "Set":
                return this.evaluateSet(expr);

            case "Get":
                return this.evaluateGet(expr);

            case "Variable":
                return this.lookUpVariable(expr.name, expr);

            case "This":
                return this.lookUpVariable(expr.keyword, expr);

            case "Super":
                return this.evaluateSuper(expr);
        }
    }

    private execute(stmt: Stmt) {
        switch (stmt.kind) {
            case "Expression":
                return this.evaluate(stmt.expression);

            case "Print":
                return this.evaluatePrintStmt(stmt);

            case "Block":
                return this.evaluateBlockStmt(stmt);

            case "Class":
                return this.evaluateClassStmt(stmt);

            case "Function":
                return this.evaluateFunctionStmt(stmt);

            case "If":
                return this.evaluateIfStmt(stmt);

            case "Return":
                return this.evaluateReturnStmt(stmt);

            case "Var":
                return this.evaluateVarStmt(stmt);

            case "While":
                return this.evaluateWhileStmt(stmt);
        }
    }

    resolve(expr: Expr, depth: number) {
        this.locals.set(expr, depth);
    }

    executeBlock(statements: Array<Stmt>, environment: Environment) {
        const previous = this.environment;

        try {
            this.environment = environment;

            for (const statement of statements) {
                this.execute(statement);
            }
        } finally {
            this.environment = previous;
        }
    }

    private evaluateBlockStmt(stmt: BlockStmt) {
        this.executeBlock(stmt.statements, new Environment(this.environment));
    }

    private evaluateClassStmt(stmt: ClassStmt) {
        let superClass: LiteralValue = null;
        if (stmt.superClass) {
            superClass = this.evaluate(stmt.superClass);

            if (!(superClass instanceof Klass)) {
                throw new RuntimeError(
                    stmt.superClass.name,
                    "Your superclass is not a class. Certified impostor moment."
                );
            }
        }

        this.environment.define(stmt.name.lexeme, null);

        if (stmt.superClass) {
            this.environment = new Environment(this.environment);
            this.environment.define("super", superClass);
        }

        const methods: Record<string, Func> = {};

        for (const method of stmt.methods) {
            const func = new Func(method, this.environment, method.name.lexeme === "init");
            methods[method.name.lexeme] = func;
        }

        const klass = new Klass(stmt.name.lexeme, methods, superClass);

        if (stmt.superClass) {
            this.environment = this.environment.enclosing!;
        }

        this.environment.assign(stmt.name, klass);
    }

    private evaluateFunctionStmt(stmt: FuncStmt) {
        const func = new Func(stmt, this.environment, false);
        this.environment.define(stmt.name.lexeme, func);
    }

    private evaluateIfStmt(stmt: IfStmt) {
        if (this.isTruthy(this.evaluate(stmt.condition))) {
            this.execute(stmt.thenBranch);
        } else if (stmt.elseBranch) {
            this.execute(stmt.elseBranch);
        }
    }

    private evaluatePrintStmt(stmt: PrintStmt) {
        const value = this.evaluate(stmt.expression);
        this.output.print(this.stringify(value));
    }

    private evaluateReturnStmt(stmt: ReturnStmt) {
        let value: LiteralValue = null;
        if (stmt.value) {
            value = this.evaluate(stmt.value);
        }

        throw new ReturnError(value);
    }

    private evaluateVarStmt(stmt: VarStmt) {
        let value = null;
        if (stmt.initializer) {
            value = this.evaluate(stmt.initializer);
        }

        this.environment.define(stmt.name.lexeme, value);
    }

    private evaluateWhileStmt(stmt: WhileStmt) {
        while (this.isTruthy(this.evaluate(stmt.condition))) {
            this.tick();
            this.execute(stmt.body);
        }
    }

    private evaluateAssign(expr: AssignExpr): LiteralValue {
        const value = this.evaluate(expr.value);

        const distance = this.locals.get(expr);
        if (distance !== null && distance !== undefined) {
            this.environment.assignAt(distance, expr.name, value);
        } else {
            this.globals.assign(expr.name, value);
        }

        return value;
    }

    private evaluateBinary(expr: BinaryExpr): LiteralValue {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case "BANG_EQUAL":
                return !this.isEqual(left, right);

            case "EQUAL_EQUAL":
                return this.isEqual(left, right);

            case "GREATER":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) > Number(right);

            case "GREATER_EQUAL":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) >= Number(right);

            case "LESS":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) < Number(right);

            case "LESS_EQUAL":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) <= Number(right);

            case "MINUS":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) - Number(right);

            case "PLUS":
                if (typeof left === "number" && typeof right === "number") {
                    return left + right;
                }

                if (typeof left === "string" && typeof right === "string") {
                    return left + right;
                }

                throw new RuntimeError(
                    expr.operator,
                    "Bro made a cursed duo. Operands must both be numbers or both be strings."
                );

            case "SLASH":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) / Number(right);

            case "STAR":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) * Number(right);

            case "MOD":
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) % Number(right);
        }

        return null;
    }

    private evaluateCall(expr: CallExpr) {
        const callee = this.evaluate(expr.callee);
        const args = expr.args.map((arg) => this.evaluate(arg));

        if (!this.isCallable(callee)) {
            throw new RuntimeError(
                expr.paren,
                "That ain't callable, chief. Only functions and classes can catch the call."
            );
        }

        if (args.length !== callee.arity()) {
            throw new RuntimeError(
                expr.paren,
                `Bro pulled up with ${args.length} arguments. This function ordered ${callee.arity()}.`
            );
        }

        return callee.call(this, args);
    }

    private evaluateGet(expr: GetExpr) {
        const object = this.evaluate(expr.object);

        if (object instanceof Instance) {
            return object.get(expr.name);
        }

        throw new RuntimeError(expr.name, "Property hunt failed. Only instances carry properties.");
    }

    private evaluateLogical(expr: LogicalExpr) {
        const left = this.evaluate(expr.left);

        if (expr.operator.type == "OR") {
            if (this.isTruthy(left)) return left;
        } else {
            if (!this.isTruthy(left)) return left;
        }

        return this.evaluate(expr.right);
    }

    private evaluateSet(expr: SetExpr) {
        const object = this.evaluate(expr.object);

        if (!(object instanceof Instance)) {
            throw new RuntimeError(
                expr.name,
                "Bro expected fields from a non-instance. Reality disagrees."
            );
        }

        const value = this.evaluate(expr.value);
        object.set(expr.name, value);
        return value;
    }

    private evaluateSuper(expr: SuperExpr): LiteralValue {
        const distance = this.locals.get(expr)!;
        const superClass = this.environment.getAt(distance, "super") as Klass;
        const object = this.environment.getAt(distance - 1, "this") as Instance;
        const method = superClass?.findMethod(expr.method.lexeme);

        if (!method) {
            throw new RuntimeError(
                expr.method,
                `Bro went treasure hunting for ${expr.method.lexeme}. That property doesn't exist.`
            );
        }

        return method.bind(object);
    }

    private evaluateUnary(expr: UnaryExpr): LiteralValue {
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case "BANG":
                return !this.isTruthy(right);

            case "MINUS":
                this.checkNumberOperand(expr.operator, right);
                return -Number(right);
        }

        return null;
    }

    private lookUpVariable(name: Token, expr: Expr) {
        const distance = this.locals.get(expr);
        if (distance !== null && distance !== undefined) {
            return this.environment.getAt(distance, name.lexeme);
        } else {
            return this.globals.get(name);
        }
    }

    private checkNumberOperand(operator: Token, operand: LiteralValue) {
        if (typeof operand === "number") {
            return;
        }

        throw new RuntimeError(operator, "Number expected. Bro submitted fan fiction instead.");
    }

    private checkNumberOperands(operator: Token, left: LiteralValue, right: LiteralValue) {
        if (typeof left === "number" && typeof right === "number") {
            return;
        }

        throw new RuntimeError(
            operator,
            "This operator only works with numbers. Don't freestyle it."
        );
    }

    private isTruthy(object: LiteralValue) {
        if (object === null || object === undefined) {
            return false;
        }
        if (typeof object === "boolean") {
            return object;
        }

        return true;
    }

    private isEqual(a: LiteralValue, b: LiteralValue) {
        if (a === null && b === null) {
            return true;
        }
        if (a === null || b === null) {
            return false;
        }

        return a === b;
    }

    private stringify(object: LiteralValue) {
        if (object === null || object == undefined) {
            return "nil";
        }

        if (typeof object === "number") {
            let text = object.toString();
            if (text.endsWith(".0")) {
                text = text.substring(0, text.length - 2);
            }
            return text;
        }

        return object.toString();
    }

    private isCallable(value: LiteralValue): value is Callable {
        return typeof value === "object" && value !== null && "call" in value;
    }

    private tick() {
        this.executionSteps += 1;

        if (this.executionSteps > LOOP_LIMIT) {
            this.output.error(
                "Infinite loop detected. This loop has more commitment than your last relationship. Execution stopped."
            );
            throw new HaltError();
        }
    }
}
