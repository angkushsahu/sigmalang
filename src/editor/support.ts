import {
    LRLanguage,
    LanguageSupport,
    indentNodeProp,
    foldNodeProp,
    foldInside,
    delimitedIndent
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

import { sigmaLangCompletion } from "./auto-complete";
import { sigmaLangLinter } from "./linter";
import { parser } from "./parser";

export const SigmaLang = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Block: delimitedIndent({ closing: "}", align: false }),
                ClassBody: delimitedIndent({ closing: "}", align: false })
            }),

            foldNodeProp.add({
                Block: foldInside,
                ClassBody: foldInside
            }),

            styleTags({
                "gang funk aura for if else yap bounce spam": t.keyword,

                "and or": t.logicOperator,
                UnaryOp: t.operator,
                MulOp: t.arithmeticOperator,
                "+ -": t.arithmeticOperator,
                "> >= < <=": t.compareOperator,
                EqOp: t.compareOperator,
                "=": t.definitionOperator,

                Boolean: t.bool,
                Null: t.null,
                Number: t.number,
                String: t.string,
                LineComment: t.lineComment,

                VariableDefinition: t.definition(t.variableName),
                VariableName: t.variableName,
                ClassName: t.definition(t.className),
                SuperclassName: t.className,
                FunctionName: t.function(t.definition(t.variableName)),
                ParamName: t.definition(t.variableName),
                PropertyName: t.propertyName,

                ThisExpr: t.self,
                SuperExpr: t.atom,

                "( )": t.paren,
                "{ }": t.brace,
                ".": t.derefOperator,
                ",": t.separator,
                ";": t.separator
            })
        ]
    }),

    languageData: {
        commentTokens: { line: "//" },
        autocomplete: sigmaLangCompletion
    }
});

export function SigmaLangEditorSupport() {
    return new LanguageSupport(SigmaLang, [sigmaLangLinter]);
}
