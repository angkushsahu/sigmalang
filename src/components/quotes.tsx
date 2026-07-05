const quotes = [
    {
        content:
            "If you encounter any bugs, send PR instead of complaints, I am too sigma to solve them myself.",
        author: <>&ndash;&nbsp;&nbsp;Author (Sigma Lang)</>
    },
    {
        content: (
            <>
                Talk is cheap. Show me the <span className="text-muted line-through">code</span>{" "}
                sigma inside you.
            </>
        ),
        author: "@SigmaTorvalds"
    },
    {
        content: "Blud dereferenced a null pointer and expected character development.",
        author: "@AlphaNullPointer"
    },
    {
        content: "Undefined behavior? Nah, that's just the CPU freestyling.",
        author: "@RizzPointer"
    },
    {
        content:
            "If your code only works after 17 console.log() calls, that's not debugging, that's emotional support.",
        author: "@SigmaCompiler"
    },
    {
        content: "The compiler isn't tweaking. It's just disappointed.",
        author: "@FanumHeap"
    },
    {
        content: "The garbage collector isn't your mom. Clean up after yourself.",
        author: "@GyattGarbageCollector"
    }
];

export function Quotes() {
    return (
        <div>
            <h2 className="mt-10 mb-8 text-center text-2xl font-medium sm:mb-8 sm:text-4xl">
                A few sigma quotes
            </h2>

            {/* <div className="flex flex-wrap gap-4"> */}
            <div className="flex flex-wrap gap-4">
                {quotes.map((quote, index) => (
                    <div
                        key={`Quote-${index + 2}`}
                        className="flex-[1_1_auto] rounded-lg bg-neutral-900 p-4 ring ring-neutral-800"
                    >
                        <p>{quote.content}</p>
                        <p className="text-muted mt-2 text-right text-sm">{quote.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
