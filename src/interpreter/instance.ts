import type { LiteralValue } from "./type";
import type { Klass } from "./class";
import type { Token } from "./token";

import { RuntimeError } from "./error";

export class Instance {
    private readonly klass: Klass;
    private readonly fields: Record<string, LiteralValue>;

    constructor(klass: Klass) {
        this.klass = klass;
        this.fields = {};
    }

    get(name: Token) {
        if (Object.hasOwn(this.fields, name.lexeme)) {
            return this.fields[name.lexeme];
        }

        const method = this.klass.findMethod(name.lexeme);
        if (method) {
            return method.bind(this);
        }

        throw new RuntimeError(name, `The object has no clue who '${name.lexeme}' is.`);
    }

    set(name: Token, value: LiteralValue) {
        this.fields[name.lexeme] = value;
    }

    toString() {
        return `${this.klass.name} instance`;
    }
}
