import gigaChadImg from "../assets/real-sigma.webp";
import gustavoImg from "../assets/gustavo.webp";
import shelbyImg from "../assets/mr-shelby.webp";
import walterWhiteImg from "../assets/walter-white.webp";
import skibidyImg from "../assets/skibidy-sigma.webp";
import patrickImg from "../assets/patrick-bateman.webp";

const testimonials = [
    { src: gigaChadImg, name: "Giga Chad" },
    { src: skibidyImg, name: "Skibiddi - The legend" },
    { src: shelbyImg, name: "Mr. Thomas Shelby" },
    { src: patrickImg, name: "Mr. Patrick" },
    { src: walterWhiteImg, name: "I am the danger" },
    { src: gustavoImg, name: "Gustavo" }
];

export function Testimonial() {
    return (
        <section className="space-y-12 px-5 py-16">
            <div>
                <h2 className="mb-4 text-2xl font-medium sm:mb-6 sm:text-4xl">
                    Write code. Become Sigma.
                </h2>
                <p className="text-muted sm:text-lg">Programming is temporary. Aura is forever.</p>
                <p className="text-muted mt-2 sm:text-lg">
                    Why&nbsp;&nbsp;
                    <span className="rounded-md bg-neutral-800 px-2 pb-1 ring ring-neutral-700">
                        print "Hello, world!"
                    </span>
                    &nbsp;&nbsp;when you can&nbsp;&nbsp;
                    <span className="rounded-md bg-neutral-800 px-2 pb-1 ring ring-neutral-700">
                        <span className="text-primary font-semibold">yap</span> "Hello, world!"
                    </span>
                </p>
            </div>

            <div>
                <h3 className="mb-6 text-right text-xl font-medium sm:text-2xl">
                    Trusted by millions of sigmas (maybe)
                </h3>

                {/* Testimonials section */}
                <div className="mr-4 flex items-center justify-end">
                    {testimonials.map((testimonial, index) => (
                        <img
                            key={`Testimonial-by-${testimonial.name}`}
                            src={testimonial.src}
                            alt={testimonial.name}
                            title={testimonial.name}
                            loading="lazy"
                            className={
                                "-mr-4 size-16 rounded-full border-5 border-neutral-800" +
                                (index === 1 || index === 5 ? " xs:block hidden" : "")
                            }
                        />
                    ))}
                </div>

                <p className="text-muted mt-2 text-right text-sm">... and many more sigmas</p>
            </div>
        </section>
    );
}
