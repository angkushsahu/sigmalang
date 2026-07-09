import { color } from "../../editor";

export function Strings() {
    return (
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
                    <span style={{ color: color.stone }}>// Prints 👉🏼 Skibidi Sigma Rizzler</span>
                </p>
            </div>
            <p className="text-muted mt-4 text-sm">Strings are just text.</p>
        </div>
    );
}
