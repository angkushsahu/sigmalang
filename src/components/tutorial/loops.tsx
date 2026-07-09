import { color } from "../../editor";

export function Loops() {
    return (
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
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
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
                    <span style={{ color: color.violet }}>&nbsp;&nbsp;&nbsp;&nbsp;yap </span>
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
                Use a `while` loop when you're feeling adventurous and trusting yourself to remember
                when to stop.
                <br />
                <em>
                    Forget the stopping condition, and congratulations—you've invented a space
                    heater for your CPU.
                </em>{" "}
                🥵.
            </p>
        </div>
    );
}
