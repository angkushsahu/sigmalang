import { color } from "../../editor";

export function Recursion() {
    return (
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
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
                    <span style={{ color: color.coral }}>n</span>
                    <span>;</span>
                </p>
                <p>
                    <span style={{ color: color.coral }}>&nbsp;&nbsp;&nbsp;&nbsp;countDown</span>
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
                <em>Peak confidence. Eventually the stack says: "Nah bro, I'm done."</em> 😵.
            </p>
        </div>
    );
}
