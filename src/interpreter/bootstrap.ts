import type { RuntimeOutput } from "./output";

import { Interpreter } from "./interpreter";
import { Resolver } from "./resolver";
import { Scanner } from "./scanner";
import { Parser } from "./parser";

export function run(source: string, output: RuntimeOutput) {
    const scanner = new Scanner(source, output);
    const tokens = scanner.scanTokens();

    const parser = new Parser(tokens, output);
    const statements = parser.parse();

    const interpreter = new Interpreter(output);

    const resolver = new Resolver(interpreter, output);
    resolver.resolve(statements);

    interpreter.interpret(statements);
}
