abstract class Shape {
    readonly color: string;
    readonly name: string;

    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }

    abstract calculateArea(): number;

    abstract print(): string;
}

class Circle extends Shape {
    radius: number;

    constructor(color: string, radius: number) {
        super(color, 'Circle');
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }

    print(): string {
        return `Area = π * radius² = π * ${this.radius}²`;
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(color: string, width: number, height: number, name: string = 'Rectangle') {
        super(color, name);
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    print(): string {
        return `Area = width * height = ${this.width} * ${this.height}`;
    }
}

class Square extends Rectangle {
    constructor(color: string, side: number) {
        super(color, side, side, 'Square');
    }

    print(): string {
        return `Area = side * side = ${this.width} * ${this.width}`;
    }
}

class Triangle extends Shape {
    base: number;
    height: number;

    constructor(color: string, base: number, height: number) {
        super(color, 'Triangle');
        this.base = base;
        this.height = height;
    }

    calculateArea(): number {
        return 0.5 * this.base * this.height;
    }

    print(): string {
        return `Area = 0.5 * base * height = 0.5 * ${this.base} * ${this.height}`;
    }
}