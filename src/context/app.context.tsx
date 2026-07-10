import { createContext, useContext, type PropsWithChildren, useRef, useState } from "react";
import { run, RuntimeOutput, type OutputEntry } from "../interpreter";

type Rank =
    "NPC" | "Beta" | "Tutorial Survivor" | "Bug Farmer" | "Aura Collector" | "Sigma" | "Giga Chad";
type RankDetails = { rank: Rank; nextRank: Rank; auraToNextRank: number };

type AppContextType = {
    output: Array<OutputEntry>;
    aura: number;
    streak: number;

    findRank(): RankDetails;
    runCode(content: string): void;
    clearOutput(): void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
    const [output, setOutput] = useState<Array<OutputEntry>>([]);
    const [aura, setAura] = useState(0);
    const [streak, setStreak] = useState(0);

    const outputRef = useRef(new RuntimeOutput());

    function findRank(): RankDetails {
        if (aura < 0) {
            return {
                rank: "NPC",
                nextRank: "Beta",
                auraToNextRank: Math.abs(aura)
            };
        } else if (aura < 20) {
            return {
                rank: "Beta",
                nextRank: "Tutorial Survivor",
                auraToNextRank: 20 - aura
            };
        } else if (aura < 40) {
            return {
                rank: "Tutorial Survivor",
                nextRank: "Bug Farmer",
                auraToNextRank: 40 - aura
            };
        } else if (aura < 60) {
            return {
                rank: "Bug Farmer",
                nextRank: "Aura Collector",
                auraToNextRank: 60 - aura
            };
        } else if (aura < 80) {
            return {
                rank: "Aura Collector",
                nextRank: "Sigma",
                auraToNextRank: 80 - aura
            };
        } else if (aura < 100) {
            return {
                rank: "Sigma",
                nextRank: "Giga Chad",
                auraToNextRank: 100 - aura
            };
        } else if (aura === 100) {
            return {
                rank: "Giga Chad",
                nextRank: "Giga Chad",
                auraToNextRank: 0
            };
        }

        return {
            rank: "NPC",
            nextRank: "Beta",
            auraToNextRank: Math.abs(aura)
        };
    }

    function runCode(content: string) {
        outputRef.current.clear();
        run(content, outputRef.current);

        const entries = outputRef.current.getEntries();
        setOutput(entries);

        const failed = entries.some((entry) => entry.type === "stderr");
        if (failed) {
            setStreak(0);
            setAura((previousAura) => {
                if (previousAura - 2 <= -100) {
                    return -100;
                }
                return previousAura - 2;
            });
        } else {
            const newStreak = streak + 1;
            let auraGain = 5;
            let bonus = 0;

            // bonus calculations
            if (newStreak >= 0 && newStreak % 10 === 0) {
                bonus = 10;
            } else if (newStreak >= 0 && newStreak % 5 === 0) {
                bonus = 5;
            }

            auraGain += bonus;
            setAura((previousAura) => {
                if (previousAura + auraGain >= 100) {
                    return 100;
                }
                return previousAura + auraGain;
            });

            setStreak((previousStreak) => previousStreak + 1);
        }
    }

    function clearOutput() {
        setOutput([]);
    }

    return (
        <AppContext.Provider value={{ aura, findRank, streak, clearOutput, output, runCode }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return context;
}
