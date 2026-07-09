import { color } from "../../editor";

export function Conditions() {
    return (
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
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
                    <span style={{ color: color.sage }}>"Bro is locked in"</span>
                    <span>;</span>
                </p>
                <p>
                    <span>{"}"}</span>
                    <span style={{ color: color.violet }}> else </span>
                    <span>{"{"}</span>
                </p>
                <p>
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
                    <span style={{ color: color.sage }}>"Negative rizz detected"</span>
                    <span>;</span>
                </p>
                <p>
                    <span>{"}"}</span>
                </p>
                <p>
                    <span style={{ color: color.stone }}>// Prints 👉🏼 Bro is locked in</span>
                </p>
            </div>
            <p className="text-muted mt-4 text-sm">
                if statements let your program make decisions.{" "}
                <em>Unlike that one friend who pushes directly to main</em> 🤬.
            </p>
        </div>
    );
}
