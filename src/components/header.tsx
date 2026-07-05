import logoImg from "../assets/logo.png";

const navLinks = [
    { link: "#editor", title: "Editor" },
    { link: "#terminal", title: "Terminal" },
    { link: "#tutorial", title: "Tutorial" }
];

export function Header() {
    return (
        <header className="shadown-lg sticky top-0 z-50 bg-neutral-900/50 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <section>
                    <img src={logoImg} alt="Sigma Lang Logo" className="size-6" loading="lazy" />
                </section>

                <section className="flex items-center justify-center gap-x-5 text-sm">
                    {navLinks.map(({ link, title }) => (
                        <a key={title} href={link} className="hover:text-primary text-neutral-300">
                            {title}
                        </a>
                    ))}
                </section>
            </div>
        </header>
    );
}
