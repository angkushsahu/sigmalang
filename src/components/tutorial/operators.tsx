const operators = {
    Parenthesis: "()",
    Braces: "{}",
    Comma: ",",
    Dot: ".",
    Minus: "-",
    Plus: "+",
    Semicolon: ";",
    Slash: "/",
    Star: "*",
    Modulus: "%",
    Not: "!",
    "Not Equal": "!=",
    Assign: "=",
    Equals: "==",
    Lesser: "<",
    "Lesser and Equal": "<=",
    Greater: ">",
    "Greater and Equal": ">="
};

export function Operators() {
    return (
        <div>
            <p className="text-xl font-medium">Operators</p>
            <p className="text-muted mt-2 text-sm">
                Variables are cool. Functions are cool. But sometimes you just need to make two
                values fight ⚔️. That's what operators are for.
            </p>
            <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300 ring ring-neutral-800">
                <div className="flex text-center">
                    <p className="flex-1 border-b-2 border-b-neutral-800 pr-8 pb-2">Symbol</p>
                    <p className="flex-1 border-b-2 border-b-neutral-800 pb-2">Meaning</p>
                </div>
                {Object.entries(operators).map(([name, symbol]) => (
                    <div
                        key={`Operator-for-${name}`}
                        className="flex rounded-md px-3 py-2 text-center even:bg-neutral-800"
                    >
                        <p className="flex-1">{symbol}</p>
                        <p className="flex-1">{name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
