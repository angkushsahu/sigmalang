import type { LiteralValue } from "./type";
import type { Callable } from "./callable";

export class Clock implements Callable {
    arity(): number {
        return 0;
    }

    call(): LiteralValue {
        return Date.now() / 1000;
    }

    toString(): string {
        return "<native fn>";
    }
}
