// Task #1

type ReturnTypeOf<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;

// Task #2

type FunctionInfo<T extends (arg: any) => any> = T extends (arg: infer P) => infer R ? [R, P] : never;
