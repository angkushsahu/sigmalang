const rickRollLinks = [
    "Editor",
    "Terminal",
    "Tutorial",
    "Contact Us",
    "About Us",
    "Directions",
    "Blog",
    "Promotions",
    "Partners",
    "Sponsors",
    "FAQs"
];

export function Footer() {
    return (
        <footer className="to-background bg-linear-to-br from-neutral-900 px-5 py-10">
            <div className="mx-auto flex max-w-6xl flex-col justify-between gap-x-16 gap-y-10 p-5 md:flex-row">
                {/* Branding */}
                <section className="flex gap-x-2">
                    <div>
                        <h1 className="mb-2 text-2xl font-medium">Sigma Lang 🗿</h1>
                        <p className="text-muted text-lg">
                            Built for fun. Not responsible for aura loss.
                        </p>
                    </div>
                </section>

                {/* Other Links */}
                <section className="grid grid-cols-2 justify-between gap-x-12 sm:flex sm:gap-y-2">
                    <div className="flex flex-col gap-y-2">
                        {rickRollLinks.slice(0, 3).map((link, index) => (
                            <a
                                key={`Footer-link-${index + 1}`}
                                href={`#${link.toLowerCase()}`}
                                className="text-muted text-sm"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        {rickRollLinks.slice(3, 7).map((link, index) => (
                            <a
                                key={`Footer-link-${index + 4}`}
                                href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                                className="text-muted text-sm"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        {rickRollLinks.slice(7).map((link, index) => (
                            <a
                                key={`Footer-link-${index + 8}`}
                                href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                                className="text-muted text-sm"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            {/* Made by section */}
            <p className="text-muted mt-8 text-center text-sm">
                Made by{" "}
                <a
                    href="https://angkushsahu.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    The real sigma male
                </a>
            </p>
        </footer>
    );
}
