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

// Interfaces for a web-based book service

interface Author {
    id: number;
    name: string;
    books: number[];
}

interface Book {
    id: number;
    title: string;
    authorId: number;
    genre: string;
}

interface BookService {
    getBookById: (id: number) => Book | undefined;
    getAuthorById: (id: number) => Author | undefined;
    getBooksByAuthorId: (authorId: number) => Book[];
}

const books: Book[] = [
    { id: 1, title: "Book One", authorId: 1, genre: "Fiction" },
    { id: 2, title: "Book Two", authorId: 2, genre: "Non-fiction" },
    { id: 3, title: "Book Three", authorId: 1, genre: "Fantasy" },
];

const authors: Author[] = [
    { id: 1, name: "Author One", books: [1, 3] },
    { id: 2, name: "Author Two", books: [2] },
];

function findBookById(id: number): Book | undefined {
    for (const book of books) {
        if (book.id === id) {
            return book;
        }
    }
    return undefined;
}

function findAuthorById(id: number): Author | undefined {
    for (const author of authors) {
        if (author.id === id) {
            return author;
        }
    }
    return undefined;
}

const bookService: BookService = {
    getBookById: findBookById,
    getAuthorById: findAuthorById,
    getBooksByAuthorId: (authorId: number) => books.filter(book => book.authorId === authorId),
};

const book = bookService.getBookById(1);
console.log(book);

const author = bookService.getAuthorById(1);
console.log(author);

const authorBooks = bookService.getBooksByAuthorId(1);
console.log(authorBooks);
