import { color } from "../../editor";

export function Variables() {
    return (
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
                Variables are like labeled boxes. Instead of remembering 9999 everywhere, Sigma
                remembers it for you.{" "}
                <em>Even the compiler has a better memory than your group project teammates</em> 🤓.
            </p>
        </div>
    );
}
