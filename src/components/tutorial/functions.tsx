import { color } from "../../editor";

export function Functions() {
    return (
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
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
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
                    <span style={{ color: color.stone }}>// Prints 👉🏼 Welcome, Sigma Rizzler!</span>
                </p>
            </div>
            <p className="text-muted mt-4 text-sm">
                Functions are reusable blocks of code. Write once. Spam forever.{" "}
                <em>Infinite aura</em> ♾️.
            </p>
        </div>
    );
}
