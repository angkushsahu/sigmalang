import type { LiteralValue } from "./type";
import type { Token } from "./token";

import { RuntimeError } from "./error";

export class Environment {
    enclosing: Environment | null;
    private values: Record<string, LiteralValue>;

    constructor(enclosing: Environment | null) {
        this.values = {};
        this.enclosing = enclosing;
    }

    get(name: Token): LiteralValue {
        if (this.values[name.lexeme] !== null && this.values[name.lexeme] !== undefined) {
            return this.values[name.lexeme];
        }

        if (this.enclosing) {
            return this.enclosing.get(name);
        }

        throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }

    assign(name: Token, value: LiteralValue) {
        if (name.lexeme in this.values) {
            this.values[name.lexeme] = value;
            return;
        }

        if (this.enclosing) {
            this.enclosing.assign(name, value);
            return;
        }

        throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }

    define(name: string, value: LiteralValue) {
        this.values[name] = value;
    }

    ancestor(distance: number) {
        let environment: Environment = this;

        for (let i = 0; i < distance; i++) {
            // todo: can be handled better as per chat gpt
            if (environment.enclosing) {
                environment = environment.enclosing;
            }
        }

        return environment;
    }

    getAt(distance: number, name: string) {
        return this.ancestor(distance).values[name];
    }

    assignAt(distance: number, name: Token, value: LiteralValue) {
        this.ancestor(distance).values[name.lexeme] = value;
    }
}
