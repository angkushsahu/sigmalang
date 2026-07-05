import { createContext, useContext, type PropsWithChildren, useRef, useState } from "react";
import { run, RuntimeOutput, type OutputEntry } from "../interpreter";

type OutputContextType = {
    output: Array<OutputEntry>;
    runCode(content: string): void;
    clearOutput(): void;
};

const OutputContext = createContext<OutputContextType | null>(null);

export function OutputProvider({ children }: PropsWithChildren) {
    const [output, setOutput] = useState<Array<OutputEntry>>([]);
    const outputRef = useRef(new RuntimeOutput());

    function runCode(content: string) {
        outputRef.current.clear();
        run(content, outputRef.current);
        setOutput(outputRef.current.getEntries());
    }

    function clearOutput() {
        setOutput([]);
    }

    return (
        <OutputContext.Provider value={{ clearOutput, output, runCode }}>
            {children}
        </OutputContext.Provider>
    );
}

export function useOutputContext() {
    const context = useContext(OutputContext);
    if (!context) {
        throw new Error("useOutputContext must be used within OutputProvider");
    }
    return context;
}
