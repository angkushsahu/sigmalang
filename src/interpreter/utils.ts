import type { LiteralValue } from "./type";
import type { Callable } from "./callable";

export class Clock implements Callable {
    arity() {
        return 0;
    }

    call(): LiteralValue {
        return Date.now() / 1000;
    }

    toString() {
        return "<native fn>";
    }
}
