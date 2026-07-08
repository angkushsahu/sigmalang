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
        if (Object.hasOwn(this.values, name.lexeme)) {
            return this.values[name.lexeme];
        }

        if (this.enclosing) {
            return this.enclosing.get(name);
        }

        throw new RuntimeError(
            name,
            `Bro thought he can use variable '${name.lexeme}' without declaring it first. 💀`
        );
    }

    assign(name: Token, value: LiteralValue) {
        if (Object.hasOwn(this.values, name.lexeme)) {
            this.values[name.lexeme] = value;
            return;
        }

        if (this.enclosing) {
            this.enclosing.assign(name, value);
            return;
        }

        throw new RuntimeError(
            name,
            `Bro thought he can use variable '${name.lexeme}' without declaring it first. 💀`
        );
    }

    define(name: string, value: LiteralValue) {
        this.values[name] = value;
    }

    ancestor(distance: number): Environment {
        let environment: Environment = this;

        for (let i = 0; i < distance; i++) {
            if (environment.enclosing) {
                environment = environment.enclosing;
            }
        }

        return environment;
    }

    getAt(distance: number, name: string): LiteralValue {
        return this.ancestor(distance).values[name];
    }

    assignAt(distance: number, name: Token, value: LiteralValue) {
        this.ancestor(distance).values[name.lexeme] = value;
    }
}
