import {
    LRLanguage,
    LanguageSupport,
    indentNodeProp,
    foldNodeProp,
    foldInside,
    delimitedIndent
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

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
                // Declaration / control-flow keywords
                "gang funk aura for if else yap bounce spam": t.keyword,

                // Logical keyword operators fall back to t.operator's
                // styling automatically (they're sub-tags of it).
                "and or": t.logicOperator,
                UnaryOp: t.operator,
                MulOp: t.arithmeticOperator,
                "+ -": t.arithmeticOperator,
                "> >= < <=": t.compareOperator,
                EqOp: t.compareOperator,
                "=": t.definitionOperator,

                // Literals
                Boolean: t.bool,
                Null: t.null,
                Number: t.number,
                String: t.string,
                LineComment: t.lineComment,

                // Names: distinguish declaration sites from references
                VariableDefinition: t.definition(t.variableName),
                VariableName: t.variableName,
                ClassName: t.definition(t.className),
                SuperclassName: t.className,
                FunctionName: t.function(t.definition(t.variableName)),
                ParamName: t.definition(t.variableName),
                PropertyName: t.propertyName,

                // "me" / "og" (this / super)
                ThisExpr: t.self,
                SuperExpr: t.atom,

                // Punctuation
                "( )": t.paren,
                "{ }": t.brace,
                ".": t.derefOperator,
                ",": t.separator,
                ";": t.separator
            })
        ]
    }),
    languageData: {
        commentTokens: { line: "//" }
    }
});

export function SigmaLangEditorSupport() {
    return new LanguageSupport(SigmaLang);
}
