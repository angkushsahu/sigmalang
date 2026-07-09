const SingleCharTokens = [
    "LEFT_PAREN",
    "RIGHT_PAREN",
    "LEFT_BRACE",
    "RIGHT_BRACE",
    "COMMA",
    "DOT",
    "MINUS",
    "PLUS",
    "SEMICOLON",
    "SLASH",
    "STAR",
    "MOD"
] as const;

const OneOrTwoCharTokens = [
    "BANG",
    "BANG_EQUAL",
    "EQUAL",
    "EQUAL_EQUAL",
    "GREATER",
    "GREATER_EQUAL",
    "LESS",
    "LESS_EQUAL"
] as const;

const Literals = ["IDENTIFIER", "STRING", "NUMBER"] as const;

export const Keywords = [
    "AND",
    "OR",
    "FOR",
    "IF",
    "ELSE",
    "FUNK", // -> "FUN",
    "GANG", // -> "CLASS",
    "NPC", // -> "NIL",
    "YAP", // -> "PRINT",
    "BOUNCE", // -> "RETURN",
    "OG", // -> "SUPER",
    "ME", // -> "THIS",
    "FAX", // -> "TRUE",
    "CAP", // -> "FALSE",
    "AURA", // -> "VAR",
    "SPAM" // -> "WHILE"
] as const;

export type TokenType =
    | (typeof SingleCharTokens)[number]
    | (typeof OneOrTwoCharTokens)[number]
    | (typeof Literals)[number]
    | (typeof Keywords)[number]
    | "EOF";
