import logoImg from "../assets/logo.png";

export function Hero() {
    return (
        <section className="from-background flex min-h-[80vh] flex-col items-center justify-center bg-linear-to-br to-neutral-900 px-5 py-10 text-center">
            <div className="flex items-center justify-center gap-x-2 rounded-full bg-linear-to-r from-neutral-800 to-neutral-900 px-6 py-2 ring ring-yellow-900">
                <img src={logoImg} alt="Sigma Lang Logo" className="size-3.5" loading="lazy" />
                <span className="text-xs">Sigma Lang</span>
            </div>

            <h1 className="mt-8 mb-4 max-w-[30ch] bg-linear-to-br from-neutral-500 to-neutral-300 bg-clip-text text-2xl leading-normal font-bold text-transparent sm:mb-6 sm:text-4xl">
                Finally... A language that speaks fluent TikTok
            </h1>
            <h2 className="text-muted max-w-[55ch] text-base sm:text-lg">
                Sigma Lang is an unnecessarily modern programming language where the interpreter has
                permanent brainrot, the syntax is questionable, and the vibes are immaculate.
            </h2>

            <div className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-4 sm:flex-row">
                <a href="#editor">
                    <button
                        type="button"
                        className="bg-primary/20 w-49 cursor-pointer rounded-md px-6 py-3 text-sm font-medium ring ring-yellow-800"
                    >
                        🚀&nbsp;&nbsp;&nbsp;Start Auramaxxing
                    </button>
                </a>
                <a href="#tutorial">
                    <button
                        type="button"
                        className="w-49 cursor-pointer rounded-md bg-neutral-800 px-6 py-3 text-sm ring ring-neutral-700"
                    >
                        📚&nbsp;&nbsp;&nbsp;Learn the Lore
                    </button>
                </a>
            </div>
        </section>
    );
}
