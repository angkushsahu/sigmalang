import { ChevronRightIcon, EraserIcon, TerminalIcon } from "lucide-react";

import { useOutputContext } from "../context";

export function Terminal() {
    const { clearOutput, output } = useOutputContext();

    return (
        <div className="rounded-xl bg-neutral-900 shadow-xl ring ring-neutral-700">
            {/* Terminal heading */}
            <div className="flex items-center justify-between rounded-t-xl border-b border-b-neutral-600 bg-neutral-800 px-4 py-2">
                <TerminalIcon className="stroke-primary size-5" />

                <button
                    type="button"
                    onClick={() => clearOutput()}
                    className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-neutral-700"
                    title="Clear Console"
                >
                    <EraserIcon className="size-4 stroke-neutral-400" />
                </button>
            </div>

            {output.length === 0 ? (
                <div className="flex h-100 items-center justify-center px-5 py-3 text-neutral-500">
                    <p className="text-center text-3xl">Nothing to print.</p>
                </div>
            ) : (
                // Terminal contents
                <div className="h-100 space-y-1 overflow-y-auto px-5 py-3 text-neutral-300">
                    <div className="pb-1 text-lg text-white">
                        <span className="font-bold text-green-500">$</span>{" "}
                        <span className="text-green-400">cook rizz.sigma</span>
                    </div>

                    {output.map((line, index) => (
                        <div
                            key={`Terminal-output-window-line-${index + 1}`}
                            className="flex items-start gap-x-0.5 whitespace-pre-wrap"
                        >
                            <ChevronRightIcon className="mt-2 inline-block size-4 shrink-0 stroke-neutral-500" />
                            <div
                                className={`w-full px-2 py-1 ${line.type === "stderr" ? "rounded-md bg-red-500/15 text-sm ring ring-red-900" : "text-base"}`}
                            >
                                {line.text}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
