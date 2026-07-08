import type { TokenType } from "./token-type";
import type { LiteralValue } from "./type";

export class Token {
    readonly type: TokenType;
    readonly lexeme: string;
    readonly literal: LiteralValue;
    readonly line: number;

    constructor(type: TokenType, lexeme: string, literal: LiteralValue, line: number) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }

    toString() {
        return `${this.type} ${this.lexeme} ${this.literal}`;
    }
}
