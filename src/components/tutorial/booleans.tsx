import { color } from "../../editor";

export function Booleans() {
    return (
        <div className="md:row-span-2">
            <p className="text-xl font-medium">Booleans</p>
            <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-300 ring ring-neutral-800">
                <p>
                    <span style={{ color: color.violet }}>aura </span>
                    <span>sigma </span>
                    <span style={{ color: color.cyan }}>= </span>
                    <span>fax</span>
                    <span>;</span>
                    <span style={{ color: color.stone }}> // true</span>
                </p>
                <p>
                    <span style={{ color: color.violet }}>aura </span>
                    <span>alpha </span>
                    <span style={{ color: color.cyan }}>= </span>
                    <span>cap</span>
                    <span>;</span>
                    <span style={{ color: color.stone }}> // false</span>
                </p>

                <br />

                <p>
                    <span style={{ color: color.violet }}>if </span>
                    <span>(</span>
                    <span style={{ color: color.coral }}>sigma</span>
                    <span>) </span>
                    <span>{"{"}</span>
                </p>
                <p>
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
                    <span style={{ color: color.sage }}>"You are a sigma, congratulations 😎"</span>
                    <span>;</span>
                </p>
                <p>
                    <span>{"}"}</span>
                    <span style={{ color: color.violet }}> else if </span>
                    <span>(</span>
                    <span style={{ color: color.coral }}>alpha</span>
                    <span>) </span>
                    <span>{"{"}</span>
                </p>
                <p>
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
                    <span style={{ color: color.sage }}>"You are at least an alpha, yay 👏"</span>
                    <span>;</span>
                </p>
                <p>
                    <span>{"}"}</span>
                    <span style={{ color: color.violet }}> else </span>
                    <span>{"{"}</span>
                </p>
                <p>
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
                    <span style={{ color: color.sage }}>
                        "You are neither a sigma nor an alpha, you are just another NPC"
                    </span>
                    <span>;</span>
                </p>
                <p>
                    <span>{"}"}</span>
                </p>

                <br />

                <p>
                    <span style={{ color: color.violet }}>aura </span>
                    <span>beta </span>
                    <span style={{ color: color.cyan }}>= </span>
                    <span>!fax</span>
                    <span>;</span>
                    <span style={{ color: color.stone }}> // not true, hence false</span>
                </p>
                <p>
                    <span style={{ color: color.violet }}>yap </span>
                    <span style={{ color: color.coral }}>beta</span>
                    <span>;</span>
                </p>

                <br />

                <div style={{ color: color.stone }}>
                    <p>// Prints 👇🏼</p>
                    <p>You are a sigma, congratulations 😎</p>
                    <p>false</p>
                </div>
            </div>

            <p className="text-muted mt-4 text-sm">
                The most decisive data type ever.{" "}
                <em>
                    It's either <strong>fax (true)</strong> or <strong>cap (false)</strong>. No
                    in-between. Anything else is overthinking
                </em>{" "}
                🤔.
            </p>
        </div>
    );
}
