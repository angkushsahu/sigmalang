import { DotIcon } from "lucide-react";
import { Fragment } from "react";

const sponsors = [
    "Google",
    "Github",
    "Open AI",
    "Stack Overflow",
    "Your CS Professor",
    "Your Mom",
    "God",
    "Common Sense"
];

export function Sponsors() {
    return (
        <section className="px-5 py-16">
            <h2 className="mb-5 text-center text-2xl font-medium sm:mb-8 sm:text-4xl">
                Proudly <span className="text-primary italic">NOT</span> sponsored by
            </h2>

            <div className="mask-image flex min-w-full gap-x-2 overflow-x-hidden select-none">
                <div className="text-muted animate-marquee flex shrink-0 items-center justify-between gap-x-2">
                    {sponsors.map((sponsor, index) => (
                        <Fragment key={`Sponsor-${index + 1}`}>
                            <span className="hover:text-foreground shrink-0 text-2xl">
                                {sponsor}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <DotIcon />
                            &nbsp;&nbsp;&nbsp;
                        </Fragment>
                    ))}
                </div>

                <div
                    aria-hidden="true"
                    className="text-muted animate-marquee flex shrink-0 items-center justify-between gap-x-2"
                >
                    {sponsors.map((sponsor, index) => (
                        <Fragment key={`Sponsor-duplicate-${index + 1}`}>
                            <span className="hover:text-foreground shrink-0 text-2xl">
                                {sponsor}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <DotIcon />
                            &nbsp;&nbsp;&nbsp;
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
