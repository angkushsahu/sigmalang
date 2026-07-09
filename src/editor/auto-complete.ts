import {
    type Completion,
    type CompletionContext,
    type CompletionResult,
    ifNotIn,
    snippetCompletion
} from "@codemirror/autocomplete";
import { syntaxTree } from "@codemirror/language";

const keywordCompletions: Array<Completion> = [
    snippetCompletion("if (${condition}) {\n\t${}\n}", {
        label: "if",
        type: "keyword",
        detail: "if statement"
    }),
    snippetCompletion("if (${condition}) {\n\t${}\n} else {\n\t${}\n}", {
        label: "if-else",
        type: "keyword",
        detail: "if/else statement"
    }),
    snippetCompletion("for (aura ${i} = 0; ${i} < ${limit}; ${i} = ${i} + 1) {\n\t${}\n}", {
        label: "for",
        type: "keyword",
        detail: "for loop"
    }),
    snippetCompletion("spam (${condition}) {\n\t${}\n}", {
        label: "spam",
        type: "keyword",
        detail: "while loop"
    }),
    snippetCompletion("funk ${name}(${params}) {\n\t${}\n}", {
        label: "funk",
        type: "keyword",
        detail: "function declaration"
    }),
    snippetCompletion("gang ${Name} {\n\t${}\n}", {
        label: "gang",
        type: "keyword",
        detail: "class declaration"
    }),
    snippetCompletion("aura ${name} = ${value};", {
        label: "aura",
        type: "keyword",
        detail: "variable declaration"
    }),
    snippetCompletion("yap ${value};", {
        label: "yap",
        type: "keyword",
        detail: "print statement"
    }),
    snippetCompletion("bounce ${value};", {
        label: "bounce",
        type: "keyword",
        detail: "return statement"
    }),
    { label: "and", type: "keyword" },
    { label: "or", type: "keyword" },
    { label: "me", type: "keyword", detail: "this" },
    { label: "og", type: "keyword", detail: "super" },
    { label: "fax", type: "keyword", detail: "true" },
    { label: "cap", type: "keyword", detail: "false" },
    { label: "npc", type: "keyword", detail: "null" }
];

function localCompletions(context: CompletionContext): CompletionResult | null {
    const word = context.matchBefore(/\w*/);
    if (!word || (word.from === word.to && !context.explicit)) {
        return null;
    }

    const seen = new Set(keywordCompletions.map((entry) => entry.label));
    const options = [...keywordCompletions];

    syntaxTree(context.state).iterate({
        enter(node) {
            const type =
                node.type.name === "VariableDefinition" || node.type.name === "ParamName"
                    ? "variable"
                    : node.type.name === "FunctionName"
                      ? "function"
                      : node.type.name === "ClassName"
                        ? "class"
                        : null;

            if (!type) {
                return;
            }

            const name = context.state.sliceDoc(node.from, node.to);
            if (seen.has(name)) {
                return;
            }

            seen.add(name);
            options.push({ label: name, type });
        }
    });

    return { from: word.from, options, validFor: /^\w*$/ };
}

export const sigmaLangCompletion = ifNotIn(["String", "LineComment"], localCompletions);
