import { color } from "../../editor";

export function Classes() {
    return (
        <div>
            <p className="text-xl font-medium">Classes</p>
            <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                <p>
                    <span style={{ color: color.violet }}>gang </span>
                    <span style={{ color: color.chalky }}>Sigma </span>
                    <span>{"{"}</span>
                </p>
                <p>
                    <span style={{ color: color.malibu }}>&nbsp;&nbsp;&nbsp;&nbsp;rizz</span>
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
    );
}
