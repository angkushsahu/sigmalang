import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { lintGutter } from "@codemirror/lint";
import { basicSetup } from "codemirror";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, SigmaIcon } from "lucide-react";

import { oneDark, SigmaLangEditorSupport } from "../editor";
import { useAppContext } from "../context";

const INITIAL_STATE = 'yap "Hello, world!";';

export default function Editor() {
    const [content, setContent] = useState(INITIAL_STATE);

    const { runCode } = useAppContext();

    const editorRef = useRef<HTMLDivElement>(null);
    const runCodeRef = useRef(runCode);

    // Simply calling `runCode` was producing state change errors
    useEffect(
        function () {
            runCodeRef.current = runCode;
        },
        [runCode]
    );

    useEffect(function () {
        if (!editorRef.current) {
            return;
        }

        const view = new EditorView({
            parent: editorRef.current,
            state: EditorState.create({
                doc: INITIAL_STATE,
                extensions: [
                    basicSetup,
                    lintGutter(),
                    keymap.of([indentWithTab]), // tab control
                    EditorView.lineWrapping,
                    SigmaLangEditorSupport(),
                    // (Ctrl / Mod) + Shift + Enter to interpret and run
                    keymap.of([
                        {
                            key: "Mod-Shift-Enter",
                            run(view) {
                                const content = view.state.doc.toString();
                                runAndScrollToTerminal(content);
                                return true;
                            }
                        }
                    ]),
                    oneDark, // theme
                    // on update
                    EditorView.updateListener.of(function (update) {
                        if (update.docChanged) {
                            const content = update.state.doc.toString();
                            setContent(content);
                        }
                    })
                ]
            })
        });

        return function () {
            view.destroy();
            editorRef.current = null;
        };
    }, []);

    function runAndScrollToTerminal(content: string) {
        runCodeRef.current(content);
        document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            {/* Editor header */}
            <div className="rounded-t-xl bg-neutral-800">
                <div className="bg-editor-background border-b-editor-border inline-flex items-center gap-x-2 rounded-tl-xl border-b py-1 pr-6 pl-4">
                    <SigmaIcon className="stroke-primary size-3.5" />
                    <span className="text-muted text-sm">rizz.sigma</span>
                </div>
            </div>

            {/* Editor */}
            <div ref={editorRef} className="relative min-h-[80vh] shadow-xl">
                {content.length >= 1 ? (
                    <button
                        type="button"
                        onClick={() => runAndScrollToTerminal(content)}
                        className="absolute top-4 right-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-md bg-neutral-600/95 shadow-md"
                        title="Run Code"
                    >
                        <PlayIcon className="size-4 stroke-neutral-400" />
                    </button>
                ) : null}
            </div>
        </>
    );
}
