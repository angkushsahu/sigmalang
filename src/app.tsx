import * as Component from "./components";

export function App() {
    return (
        <main className="bg-background text-foreground antialiased">
            <Component.Header />

            <Component.Hero />

            <div className="mx-auto max-w-6xl px-5 pb-16">
                <Component.Testimonial />

                <Component.Sponsors />

                {/* Editor section */}
                <section id="editor" className="py-5">
                    <Component.Editor />
                </section>

                {/* Terminal section */}
                <section id="terminal" className="py-5">
                    <Component.Terminal />
                </section>

                {/* Tutorial section */}
                <section id="tutorial" className="py-5">
                    <Component.Tutorial />
                </section>

                {/* Quote section */}
                <section id="tutorial" className="py-5">
                    <Component.Quotes />
                </section>
            </div>

            <Component.Footer />
        </main>
    );
}
