import type { FuncStmt, LiteralValue } from "./type";
import type { Interpreter } from "./interpreter";
import type { Callable } from "./callable";
import type { Instance } from "./instance";

import { Environment } from "./environment";
import { ReturnError } from "./error";

export class Func implements Callable {
    private readonly declaration: FuncStmt;
    private readonly closure: Environment;
    private readonly isInitializer: boolean;

    constructor(declaration: FuncStmt, closure: Environment, isInitializer: boolean) {
        this.declaration = declaration;
        this.closure = closure;
        this.isInitializer = isInitializer;
    }

    bind(instance: Instance) {
        const environment = new Environment(this.closure);
        environment.define("this", instance);
        return new Func(this.declaration, environment, this.isInitializer);
    }

    toString() {
        return `<fn ${this.declaration.name.lexeme}>`;
    }

    arity(): number {
        return this.declaration.params.length;
    }

    call(interpreter: Interpreter, args: Array<LiteralValue>): LiteralValue {
        const environment = new Environment(this.closure);

        this.declaration.params.forEach((param, index) => {
            environment.define(param.lexeme, args[index]);
        });

        try {
            interpreter.executeBlock(this.declaration.body, environment);
        } catch (error: unknown) {
            if (error instanceof ReturnError) {
                if (this.isInitializer) {
                    return this.closure.getAt(0, "this");
                }

                return error.value;
            }
        }

        if (this.isInitializer) {
            return this.closure.getAt(0, "this");
        }

        return null;
    }
}
