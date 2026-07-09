function Keyboard({ content }: { content: string }) {
    return (
        <span className="bg-background mx-1 rounded-sm px-2 py-1 ring ring-neutral-800">
            {content}
        </span>
    );
}

export function RunningCode() {
    return (
        <div>
            <p className="text-xl font-medium">Running your code</p>
            <div className="mt-4 space-y-3 rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300 ring ring-neutral-800">
                <p>
                    Press the Run Code button on the top-right hand side of the editor.
                    Alternatively, you can also press <Keyboard content="Ctrl + Shift + Enter" />
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
    );
}
