import type { Interpreter } from "./interpreter";
import type { LiteralValue } from "./type";

export type Callable = {
    arity(): number;
    call(interpreter: Interpreter, args: Array<LiteralValue>): LiteralValue;
};
