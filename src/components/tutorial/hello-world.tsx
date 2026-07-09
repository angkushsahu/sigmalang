import { color } from "../../editor";

export function HelloWorld() {
    return (
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
    );
}
