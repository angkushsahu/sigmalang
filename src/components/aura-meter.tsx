import { useAppContext } from "../context";

export function AuraMeter() {
    const { aura } = useAppContext();

    return (
        <section className="my-10 flex flex-col items-start justify-between gap-x-12 gap-y-6 rounded-xl bg-neutral-900 px-5 py-10 lg:flex-row">
            <div className="w-full flex-1">
                <div>
                    <h2 className="mb-4 text-xl font-medium">Aura Meter</h2>
                    <p className="text-muted">
                        <span className="text-green-600">+5 aura</span> for successful compile.{" "}
                        <span className="text-red-500">-2</span> for failed compile. Consecutive
                        successes unlock bonus Aura.
                    </p>
                </div>

                <div className="flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-end">
                    {/* Progress bar */}
                    <div role="progressbar" className="mt-8 flex flex-1 flex-wrap gap-3">
                        <div className="relative flex h-4 w-full items-center overflow-x-hidden rounded-full bg-neutral-800">
                            <div
                                style={{ height: "inherit", width: `${Math.abs(aura)}%` }}
                                data-positive-aura={aura >= 0}
                                className="inset-s-0 h-full rounded-full transition-all duration-700 data-[positive-aura=false]:bg-red-800 data-[positive-aura=true]:bg-neutral-400"
                            ></div>
                        </div>
                    </div>
                    <div className="text-muted text-right sm:text-left">{aura} %</div>
                </div>
            </div>

            <Stats />
        </section>
    );
}

function Stats() {
    const { findRank, streak } = useAppContext();
    const { auraToNextRank, nextRank, rank } = findRank();

    return (
        <div className="text-muted flex w-full flex-wrap items-center justify-between gap-x-10 text-sm lg:w-65">
            {/* Compile Streak */}
            <div className="flex items-center justify-center">
                <div className="rounded-l-full bg-neutral-800/80 px-3 py-1 ring-2 ring-neutral-700">
                    Compile Streak
                </div>
                <div className="rounded-r-full bg-neutral-800/80 px-3 py-1 ring-2 ring-neutral-700">
                    {streak}
                </div>
            </div>

            {/* Current Rank */}
            <div className="my-6 flex items-center justify-center">
                <div
                    data-rank={rank}
                    className="rounded-l-full px-3 py-1 ring-2 data-[rank=Aura_Collector]:bg-purple-800/20 data-[rank=Aura_Collector]:ring-purple-900 data-[rank=Beta]:bg-yellow-800/20 data-[rank=Beta]:ring-yellow-900 data-[rank=Bug_Farmer]:bg-cyan-800/20 data-[rank=Bug_Farmer]:ring-cyan-900 data-[rank=Giga_Chad]:bg-green-800/20 data-[rank=Giga_Chad]:ring-green-900 data-[rank=NPC]:bg-red-800/20 data-[rank=NPC]:ring-red-900 data-[rank=Sigma]:bg-blue-800/20 data-[rank=Sigma]:ring-blue-900 data-[rank=Tutorial_Survivor]:bg-orange-800/20 data-[rank=Tutorial_Survivor]:ring-orange-900"
                >
                    Current Rank
                </div>
                <div
                    data-rank={rank}
                    className="rounded-r-full px-3 py-1 ring-2 data-[rank=Aura_Collector]:bg-purple-800/20 data-[rank=Aura_Collector]:ring-purple-900 data-[rank=Beta]:bg-yellow-800/20 data-[rank=Beta]:ring-yellow-900 data-[rank=Bug_Farmer]:bg-cyan-800/20 data-[rank=Bug_Farmer]:ring-cyan-900 data-[rank=Giga_Chad]:bg-green-800/20 data-[rank=Giga_Chad]:ring-green-900 data-[rank=NPC]:bg-red-800/20 data-[rank=NPC]:ring-red-900 data-[rank=Sigma]:bg-blue-800/20 data-[rank=Sigma]:ring-blue-900 data-[rank=Tutorial_Survivor]:bg-orange-800/20 data-[rank=Tutorial_Survivor]:ring-orange-900"
                >
                    {rank}
                </div>
            </div>

            {/* Next Rank */}
            <div>
                {rank === "Giga Chad" ? (
                    <>
                        Aura maxxing complete,{" "}
                        <span className="font-semibold italic">Giga Chad</span> 🫡
                    </>
                ) : (
                    <>
                        <p>Next Rank</p>
                        <div className="mt-1">
                            <span className="text-base text-white">{nextRank}</span>&nbsp; (after{" "}
                            {auraToNextRank} aura points)
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
