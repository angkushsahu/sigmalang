import { lazy, Suspense } from "react";
import { Toaster } from "sonner";

import * as Component from "./components";

const Editor = lazy(() => import("./components/editor"));

export function App() {
    return (
        <>
            <main className="bg-background text-foreground antialiased">
                <Component.Header />

                <Component.Hero />

                <div className="mx-auto max-w-6xl px-5 pb-16">
                    <Component.Testimonial />

                    <Component.Sponsors />

                    {/* Editor section */}
                    <section id="editor" className="py-5">
                        <Suspense fallback={<Component.EditorLoading />}>
                            <Editor />
                        </Suspense>
                    </section>

                    {/* Aura-meter section */}
                    <Component.AuraMeter />

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

            <Toaster
                position="bottom-center"
                theme="dark"
                swipeDirections={["right", "left", "bottom"]}
            />
        </>
    );
}
