// 1. Interface with index signature and union types

interface StringNumberIndex {
    [key: string]: number | string;
}

// 2. Interface where values are functions

interface FunctionIndex {
    [key: string]: (...args: any[]) => any;
}

// 3. Interface with numeric keys and a specific value type

interface ArrayLike<T> {
    [index: number]: T;
}

// 4. Interface with specific properties and an index signature

interface DynamicProperties {
    name: string;
    [key: string]: string | number;
}

// 5. Interfaces with an index signature and extension

interface BasicIndex {
    [key: string]: number;
}

interface ExtendedIndex {
    name: string;
    age: number;
    [key: string]: number | string;
}

// 6. Function that checks if all values in the object are numbers

function areAllValuesNumbers(obj: { [key: string]: any }): boolean {
    for (let key in obj) {
        if (typeof obj[key] !== 'number') {
            return false;
        }
    }
    return true;
}