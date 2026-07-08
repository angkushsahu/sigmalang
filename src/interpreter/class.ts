import type { Interpreter } from "./interpreter";
import type { LiteralValue } from "./type";
import type { Callable } from "./callable";
import type { Func } from "./function";

import { Instance } from "./instance";

export class Klass implements Callable {
    readonly name: string;
    private readonly methods: Record<string, Func>;
    superClass: Klass | null;

    constructor(name: string, methods: Record<string, Func>, superClass: Klass | null) {
        this.name = name;
        this.methods = methods;
        this.superClass = superClass;
    }

    findMethod(name: string): Func | null {
        if (Object.hasOwn(this.methods, name)) {
            return this.methods[name];
        }

        if (this.superClass) {
            return this.superClass.findMethod(name);
        }

        return null;
    }

    toString() {
        return this.name;
    }

    call(interpreter: Interpreter, args: Array<LiteralValue>) {
        const instance = new Instance(this);

        const initializer = this.findMethod("init");
        if (initializer) {
            initializer.bind(instance).call(interpreter, args);
        }

        return instance;
    }

    arity() {
        const initializer = this.findMethod("init");
        if (initializer === null) {
            return 0;
        }

        return initializer.arity();
    }
}
