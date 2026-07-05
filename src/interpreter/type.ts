import type { Callable } from "./callable";
import type { Instance } from "./instance";
import type { Klass } from "./class";
import type { Token } from "./token";

export type LiteralValue = string | number | boolean | null | Callable | Klass | Instance;

// Expression types -- begin
export type Expr =
    | AssignExpr
    | BinaryExpr
    | CallExpr
    | GetExpr
    | GroupingExpr
    | LiteralExpr
    | LogicalExpr
    | SetExpr
    | SuperExpr
    | ThisExpr
    | UnaryExpr
    | VariableExpr;

export type AssignExpr = {
    kind: "Assign";
    name: Token;
    value: Expr;
};

export type BinaryExpr = {
    kind: "Binary";
    left: Expr;
    operator: Token;
    right: Expr;
};

export type CallExpr = {
    kind: "Call";
    callee: Expr;
    paren: Token;
    args: Array<Expr>;
};

export type GetExpr = {
    kind: "Get";
    object: Expr;
    name: Token;
};

export type GroupingExpr = {
    kind: "Grouping";
    expression: Expr;
};

export type LiteralExpr = {
    kind: "Literal";
    value: LiteralValue;
};

export type LogicalExpr = {
    kind: "Logical";
    left: Expr;
    operator: Token;
    right: Expr;
};

export type SetExpr = {
    kind: "Set";
    object: Expr;
    name: Token;
    value: Expr;
};

export type SuperExpr = {
    kind: "Super";
    keyword: Token;
    method: Token;
};

export type ThisExpr = {
    kind: "This";
    keyword: Token;
};

export type UnaryExpr = {
    kind: "Unary";
    operator: Token;
    right: Expr;
};

export type VariableExpr = {
    kind: "Variable";
    name: Token;
};
// Expression types -- end

// Statement types -- begin
export type Stmt =
    | BlockStmt
    | ClassStmt
    | ExprStmt
    | FuncStmt
    | IfStmt
    | PrintStmt
    | ReturnStmt
    | VarStmt
    | WhileStmt;

export type BlockStmt = {
    kind: "Block";
    statements: Array<Stmt>;
};

export type ClassStmt = {
    kind: "Class";
    name: Token;
    superClass: VariableExpr | null;
    methods: Array<FuncStmt>;
};

export type ExprStmt = {
    kind: "Expression";
    expression: Expr;
};

export type FuncStmt = {
    kind: "Function";
    name: Token;
    params: Array<Token>;
    body: Array<Stmt>;
};

export type IfStmt = {
    kind: "If";
    condition: Expr;
    thenBranch: Stmt;
    elseBranch: Stmt | null;
};

export type PrintStmt = {
    kind: "Print";
    expression: Expr;
};

export type ReturnStmt = {
    kind: "Return";
    keyword: Token;
    value: Expr | null;
};

export type VarStmt = {
    kind: "Var";
    name: Token;
    initializer: Expr | null;
};

export type WhileStmt = {
    kind: "While";
    condition: Expr;
    body: Stmt;
};
// Statement types -- end
