import { linter, type Diagnostic } from "@codemirror/lint";
import { syntaxTree } from "@codemirror/language";

export const sigmaLangLinter = linter(function (view) {
    const diagnostics: Array<Diagnostic> = [];

    syntaxTree(view.state).iterate({
        enter(node) {
            if (!node.type.isError) {
                return;
            }

            diagnostics.push({
                from: node.from,
                to: node.to > node.from ? node.to : Math.min(node.from + 1, view.state.doc.length),
                severity: "error",
                message: "Syntax error: Unexpected or missing token here."
            });
        }
    });

    return diagnostics;
});
