import type { RuntimeOutput } from "./output";
import type { LiteralValue } from "./type";

import { Keywords, type TokenType } from "./token-type";
import { Token } from "./token";

export class Scanner {
    private readonly source: string;
    private tokens: Array<Token>;
    private start: number;
    private current: number;
    private line: number;
    private output: RuntimeOutput;

    constructor(source: string, output: RuntimeOutput) {
        this.source = source;
        this.output = output;
        this.tokens = [];

        this.start = 0;
        this.current = 0;
        this.line = 1;
    }

    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.tokens.push(new Token("EOF", "", null, this.line));
        return this.tokens;
    }

    private scanToken() {
        const c = this.advance();

        switch (c) {
            case "(":
                this.addToken("LEFT_PAREN", null);
                break;

            case ")":
                this.addToken("RIGHT_PAREN", null);
                break;

            case "{":
                this.addToken("LEFT_BRACE", null);
                break;

            case "}":
                this.addToken("RIGHT_BRACE", null);
                break;

            case ",":
                this.addToken("COMMA", null);
                break;

            case ".":
                this.addToken("DOT", null);
                break;

            case "-":
                this.addToken("MINUS", null);
                break;

            case "+":
                this.addToken("PLUS", null);
                break;

            case ";":
                this.addToken("SEMICOLON", null);
                break;

            case "*":
                this.addToken("STAR", null);
                break;

            case "!":
                this.addToken(this.match("=") ? "BANG_EQUAL" : "BANG", null);
                break;

            case "=":
                this.addToken(this.match("=") ? "EQUAL_EQUAL" : "EQUAL", null);
                break;

            case "<":
                this.addToken(this.match("=") ? "LESS_EQUAL" : "LESS", null);
                break;

            case ">":
                this.addToken(this.match("=") ? "GREATER_EQUAL" : "GREATER", null);
                break;

            case "/": {
                if (this.match("/")) {
                    while (this.peek() != "\n" && !this.isAtEnd()) {
                        this.advance();
                    }
                } else {
                    this.addToken("SLASH", null);
                }

                break;
            }
            case " ":
            case "\r":
            case "\t":
                break;

            case "\n":
                this.line += 1;
                break;

            case '"':
                this.string();
                break;

            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } else {
                    this.output.reportError(this.line, "", "Unexpected character.");
                    break;
                }
                break;
        }
    }

    private identifier() {
        while (this.isAlphaNumeric(this.peek())) {
            this.advance();
        }

        const text = this.source.substring(this.start, this.current);
        const upper = text.toUpperCase();

        if (Keywords.includes(upper as "AND")) {
            this.addToken(upper as "AND", null);
        } else {
            this.addToken("IDENTIFIER", null);
        }
    }

    private number() {
        while (this.isDigit(this.peek())) {
            this.advance();
        }

        if (this.peek() === "." && this.isDigit(this.peekNext())) {
            this.advance();

            while (this.isDigit(this.peek())) {
                this.advance();
            }
        }

        this.addToken("NUMBER", parseFloat(this.source.substring(this.start, this.current)));
    }

    private string() {
        while (this.peek() != '"' && !this.isAtEnd()) {
            if (this.peek() === "\n") {
                this.line += 1;
            }
            this.advance();
        }

        if (this.isAtEnd()) {
            this.output.reportError(this.line, "", "Unterminated string.");
            return;
        }

        this.advance();

        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken("STRING", value);
    }

    private match(expected: string) {
        if (this.isAtEnd()) {
            return false;
        }
        if (this.source.charAt(this.current) != expected) {
            return false;
        }

        this.current += 1;
        return true;
    }

    private peek() {
        if (this.isAtEnd()) {
            return "\0";
        }
        return this.source.charAt(this.current);
    }

    private peekNext() {
        if (this.current + 1 >= this.source.length) {
            return "\0";
        }

        return this.source.charAt(this.current + 1);
    }

    private isAlpha(c: string) {
        return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
    }

    private isAlphaNumeric(c: string) {
        return this.isAlpha(c) || this.isDigit(c);
    }

    private isDigit(c: string) {
        return c >= "0" && c <= "9";
    }

    private isAtEnd() {
        return this.current >= this.source.length;
    }

    private advance() {
        return this.source.charAt(this.current++);
    }

    private addToken(type: TokenType, literal: LiteralValue | null) {
        const text = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, text, literal, this.line));
    }
}
