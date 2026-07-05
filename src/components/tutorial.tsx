import { color } from "../editor";

function Keyboard({ content }: { content: string }) {
    return (
        <span className="bg-background mx-1 rounded-sm px-2 py-1 ring ring-neutral-800">
            {content}
        </span>
    );
}

export function Tutorial() {
    return (
        <div className="mt-16">
            <h2 className="mb-4 text-center text-2xl font-medium sm:mb-6 sm:text-4xl">Tutorial</h2>
            <p className="text-muted text-center">
                So you want to be a sigma after all, fine, let's get you rollin'
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 md:grid-rows-[repeat(5,auto)]">
                {/* Run your code */}
                <div>
                    <p className="text-xl font-medium">Running your code</p>
                    <div className="mt-4 space-y-3 rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            Press the Run Code button on the top-right hand side of the editor.
                            Alternatively, you can also press{" "}
                            <Keyboard content="Ctrl + Shift + Enter" />
                            or press <Keyboard content="Cmd + Shift + Enter" />
                            on macOS to execute your Sigma program.
                        </p>
                        <p>
                            If nothing happens, that's called a bug 🐛.
                            <br />
                            If something unexpected happens, that's called a feature 😎.
                        </p>
                    </div>
                </div>

                {/* Hello world program */}
                <div>
                    <p className="text-xl font-medium">Hello World</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            <span style={{ color: color.violet }}>yap </span>
                            <span style={{ color: color.sage }}>"Hello, World!"</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.stone }}>// Prints 👉🏼 Hello, World!</span>
                        </p>
                    </div>
                    <p className="text-muted mt-4 text-sm">
                        You have successfully convinced electrons to display text.{" "}
                        <em>Your parents can finally say you're a software engineer</em> 💻.
                    </p>
                </div>

                {/* Variables */}
                <div>
                    <p className="text-xl font-medium">Variables</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            <span style={{ color: color.violet }}>aura </span>
                            <span>a </span>
                            <span style={{ color: color.cyan }}>= </span>
                            <span style={{ color: color.chalky }}>9999</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>yap </span>
                            <span style={{ color: color.coral }}>a</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.stone }}>// Prints 👉🏼 9999</span>
                        </p>
                    </div>
                    <p className="text-muted mt-4 text-sm">
                        Variables are like labeled boxes. Instead of remembering 9999 everywhere,
                        Sigma remembers it for you.{" "}
                        <em>
                            Even the compiler has a better memory than your group project teammates
                        </em>{" "}
                        🤓.
                    </p>
                </div>

                {/* Strings */}
                <div>
                    <p className="text-xl font-medium">Strings</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            <span style={{ color: color.violet }}>aura </span>
                            <span>phrase </span>
                            <span style={{ color: color.cyan }}>= </span>
                            <span style={{ color: color.chalky }}>"Skibidi Sigma Rizzler"</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>yap </span>
                            <span style={{ color: color.coral }}>phrase</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.stone }}>
                                // Prints 👉🏼 Skibidi Sigma Rizzler
                            </span>
                        </p>
                    </div>
                    <p className="text-muted mt-4 text-sm">Strings are just text.</p>
                </div>

                {/* Conditions */}
                <div>
                    <p className="text-xl font-medium">Conditions</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            <span style={{ color: color.violet }}>aura </span>
                            <span>rizz </span>
                            <span style={{ color: color.cyan }}>= </span>
                            <span style={{ color: color.chalky }}>10</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>if </span>
                            <span>(</span>
                            <span style={{ color: color.coral }}>rizz </span>
                            <span style={{ color: color.cyan }}>&gt; </span>
                            <span style={{ color: color.chalky }}>1</span>
                            <span>) </span>
                            <span>{"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;yap{" "}
                            </span>
                            <span style={{ color: color.sage }}>"Bro is locked in"</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span>{"}"}</span>
                            <span style={{ color: color.violet }}> else </span>
                            <span>{"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;yap{" "}
                            </span>
                            <span style={{ color: color.sage }}>"Negative rizz detected"</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span>{"}"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.stone }}>
                                // Prints 👉🏼 Bro is locked in
                            </span>
                        </p>
                    </div>
                    <p className="text-muted mt-4 text-sm">
                        if statements let your program make decisions.{" "}
                        <em>Unlike that one friend who pushes directly to main</em> 🤬.
                    </p>
                </div>

                {/* Functions */}
                <div>
                    <p className="text-xl font-medium">Functions</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            <span style={{ color: color.violet }}>funk </span>
                            <span style={{ color: color.malibu }}>greet</span>
                            <span>(</span>
                            <span>name</span>
                            <span>) </span>
                            <span>{"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;yap{" "}
                            </span>
                            <span style={{ color: color.sage }}>"Welcome, " </span>
                            <span style={{ color: color.cyan }}>+ </span>
                            <span style={{ color: color.coral }}>name </span>
                            <span style={{ color: color.cyan }}>+ </span>
                            <span style={{ color: color.sage }}>"!"</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span>{"}"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.coral }}>greet</span>
                            <span>(</span>
                            <span style={{ color: color.sage }}>"Sigma Rizzler"</span>
                            <span>)</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.stone }}>
                                // Prints 👉🏼 Welcome, Sigma Rizzler!
                            </span>
                        </p>
                    </div>
                    <p className="text-muted mt-4 text-sm">
                        Functions are reusable blocks of code. Write once. Spam forever.{" "}
                        <em>Infinite aura</em> ♾️.
                    </p>
                </div>

                {/* Loops */}
                <div className="md:row-span-2">
                    <p className="text-xl font-medium">Loops</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p style={{ color: color.stone }}>// The Spam loop</p>
                        <p>
                            <span style={{ color: color.violet }}>aura </span>
                            <span>j </span>
                            <span style={{ color: color.cyan }}>= </span>
                            <span style={{ color: color.chalky }}>0</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>spam </span>
                            <span>(</span>
                            <span style={{ color: color.coral }}>j </span>
                            <span style={{ color: color.cyan }}>&lt; </span>
                            <span style={{ color: color.chalky }}>5</span>
                            <span>) </span>
                            <span>{"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;yap{" "}
                            </span>
                            <span style={{ color: color.coral }}>j</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.coral }}>&nbsp;&nbsp;&nbsp;&nbsp;j </span>
                            <span style={{ color: color.cyan }}>= </span>
                            <span style={{ color: color.coral }}>j </span>
                            <span style={{ color: color.cyan }}>+ </span>
                            <span style={{ color: color.chalky }}>1</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span>{"}"}</span>
                        </p>

                        <br />

                        <p style={{ color: color.stone }}>// The For loop</p>
                        <p>
                            <span style={{ color: color.violet }}>for </span>
                            <span>(</span>
                            <span style={{ color: color.violet }}>aura </span>
                            <span>i </span>
                            <span style={{ color: color.cyan }}>= </span>
                            <span style={{ color: color.chalky }}>1</span>
                            <span>; </span>
                            <span style={{ color: color.coral }}>i </span>
                            <span style={{ color: color.cyan }}>&lt;= </span>
                            <span style={{ color: color.chalky }}>5</span>
                            <span>; </span>
                            <span style={{ color: color.coral }}>i </span>
                            <span style={{ color: color.cyan }}>= </span>
                            <span style={{ color: color.coral }}>i </span>
                            <span style={{ color: color.cyan }}>+ </span>
                            <span style={{ color: color.chalky }}>1</span>
                            <span>) {"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;yap{" "}
                            </span>
                            <span style={{ color: color.sage }}>"Fanum Tax"</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span>{"}"}</span>
                        </p>

                        <br />

                        <div style={{ color: color.stone }}>
                            <p>// Prints 👇🏼</p>
                            <p>0</p>
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>Fanum Tax</p>
                            <p>Fanum Tax</p>
                            <p>Fanum Tax</p>
                            <p>Fanum Tax</p>
                            <p>Fanum Tax</p>
                        </div>
                    </div>
                    <p className="text-muted mt-4 text-sm">
                        Loops repeat code automatically.
                        <br />
                        Use a `for` loop when you know how many times you're about to cook.
                        <br />
                        Use a `while` loop when you're feeling adventurous and trusting yourself to
                        remember when to stop.
                        <br />
                        <em>
                            Forget the stopping condition, and congratulations—you've invented a
                            space heater for your CPU.
                        </em>{" "}
                        🥵.
                    </p>
                </div>

                {/* Classes */}
                <div>
                    <p className="text-xl font-medium">Classes</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            <span style={{ color: color.violet }}>gang </span>
                            <span style={{ color: color.chalky }}>Sigma </span>
                            <span>{"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.malibu }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;rizz
                            </span>
                            <span>() {"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yap{" "}
                            </span>
                            <span style={{ color: color.sage }}>"Howdy"</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</span>
                        </p>
                        <p>
                            <span>{"}"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.coral }}>Sigma</span>
                            <span>()</span>
                            <span style={{ color: color.cyan }}>.</span>
                            <span style={{ color: color.coral }}>rizz</span>
                            <span>()</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.stone }}>// Prints 👉🏼 Howdy</span>
                        </p>
                    </div>
                    <p className="text-muted mt-4 text-sm">
                        Classes let you create your own types. Think of them as factories.{" "}
                        <em>Not NFT factories. Real ones</em> 🏭.
                    </p>
                </div>

                {/* Recursion */}
                <div>
                    <p className="text-xl font-medium">Recursion</p>
                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                        <p>
                            <span style={{ color: color.violet }}>funk </span>
                            <span style={{ color: color.malibu }}>countDown</span>
                            <span>(</span>
                            <span>n</span>
                            <span>) </span>
                            <span>{"{"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;if </span>
                            <span>(</span>
                            <span style={{ color: color.coral }}>n </span>
                            <span>== </span>
                            <span style={{ color: color.chalky }}>0</span>
                            <span>) </span>
                            <span style={{ color: color.violet }}>bounce</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.violet }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;yap{" "}
                            </span>
                            <span style={{ color: color.coral }}>n</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span style={{ color: color.coral }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;countDown
                            </span>
                            <span>(</span>
                            <span style={{ color: color.coral }}>n </span>
                            <span style={{ color: color.cyan }}>- </span>
                            <span style={{ color: color.chalky }}>1</span>
                            <span>)</span>
                            <span>;</span>
                        </p>
                        <p>
                            <span>{"}"}</span>
                        </p>
                        <p>
                            <span style={{ color: color.coral }}>countDown</span>
                            <span>(</span>
                            <span style={{ color: color.chalky }}>5</span>
                            <span>)</span>
                            <span>;</span>
                        </p>
                        <div style={{ color: color.stone }}>
                            <p>// Prints 👇🏼</p>
                            <p>5</p>
                            <p>4</p>
                            <p>3</p>
                            <p>2</p>
                            <p>1</p>
                        </div>
                    </div>
                    <p className="text-muted mt-4 text-sm">
                        A function calling itself.{" "}
                        <em>Peak confidence. Eventually the stack says: "Nah bro, I'm done."</em>{" "}
                        😵.
                    </p>
                </div>
            </div>
        </div>
    );
}
