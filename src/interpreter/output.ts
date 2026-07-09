import type { RuntimeError } from "./error";
import type { Token } from "./token";

export type OutputEntry = { type: "stdout"; text: string } | { type: "stderr"; text: string };

export class RuntimeOutput {
    private entries: Array<OutputEntry>;

    constructor() {
        this.entries = [];
    }

    print(text: string) {
        this.entries.push({ type: "stdout", text });
    }

    error(text: string) {
        this.entries.push({ type: "stderr", text });
    }

    runtimeError(error: RuntimeError) {
        this.entries.push({ type: "stderr", text: `[line ${error.token.line}] ${error.message}` });
    }

    tokenError(token: Token, message: string) {
        if (token.type === "EOF") {
            this.reportError(token.line, "at end", message);
        } else {
            this.reportError(token.line, `at '${token.lexeme}'`, message);
        }
    }

    reportError(line: number, where: string, message: string) {
        this.entries.push({ type: "stderr", text: `[line ${line}] Error ${where}: ${message}` });
    }

    clear() {
        this.entries = [];
    }

    getEntries() {
        return this.entries;
    }
}
