// Calculator

interface Calculator {
    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
    multiply: (a: number, b: number) => number;
    divide: (a: number, b: number) => number;
}

const calculator: Calculator = {
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    multiply: (a: number, b: number) => a * b,
    divide: (a: number, b: number) => a / b,
};

function calculate(calc: Calculator, operation: keyof Calculator, a: number, b: number): number {
    return calc[operation](a, b);
}

const result = calculate(calculator, "add", 5, 3);

//