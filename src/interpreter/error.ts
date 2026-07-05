import type { LiteralValue } from "./type";
import type { Token } from "./token";

export class RuntimeError extends Error {
    readonly token: Token;

    constructor(token: Token, message: string) {
        super(message);
        this.token = token;
    }
}

export class ParseError extends Error {
    constructor() {
        super("Error during parsing code.");
    }
}

export class HaltError extends Error {}

export class ReturnError extends Error {
    readonly value: LiteralValue;

    constructor(value: LiteralValue) {
        super();
        this.value = value;
    }
}
