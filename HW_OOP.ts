enum Status {
    Pending = "Pending",
    Completed = "Completed"
}

abstract class Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    status: Status;

    constructor(id: number, title: string, content: string) {
        if (!title || !content) throw new Error("Title and content cannot be empty.");
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
        this.status = Status.Pending;
    }

    abstract editContent(newContent: string): void;

    markAsCompleted(): void {
        this.status = Status.Completed;
    }

    updateTimestamp(): void {
        this.updatedAt = new Date();
    }
}

class ConfirmableNote extends Note {
    editContent(newContent: string): void {
        if (confirm("Are you sure you want to edit this note?")) {
            if (!newContent) throw new Error("Content cannot be empty.");
            this.content = newContent;
            this.updateTimestamp();
        }
    }
}

class DefaultNote extends Note {
    editContent(newContent: string): void {
        if (!newContent) throw new Error("Content cannot be empty.");
        this.content = newContent;
        this.updateTimestamp();
    }
}

class TodoList {
    protected notes: Note[] = [];
    protected nextId = 1;

    addNote(title: string, content: string, confirmable: boolean = false): void {
        const note = confirmable
            ? new ConfirmableNote(this.nextId++, title, content)
            : new DefaultNote(this.nextId++, title, content);
        this.notes.push(note);
    }

    deleteNoteById(id: number): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }

    editNoteById(id: number, newContent: string): void {
        const note = this.getNoteById(id);
        if (note) note.editContent(newContent);
    }

    getNoteById(id: number): Note | undefined {
        return this.notes.filter(note => note.id === id)[0];
    }

    getAllNotes(): Note[] {
        return this.notes;
    }

    markNoteAsCompleted(id: number): void {
        const note = this.getNoteById(id);
        if (note) note.markAsCompleted();
    }

    getTotalNotesCount(): number {
        return this.notes.length;
    }

    getPendingNotesCount(): number {
        return this.notes.filter(note => note.status === Status.Pending).length;
    }
}

class SearchableTodoList extends TodoList {
    // Метод для пошуку за назвою
    searchByTitle(query: string): Note[] {
        const lowerQuery = query.toLowerCase();
        return this.notes.filter(note => new RegExp(lowerQuery).test(note.title.toLowerCase()));
    }

    searchByContent(query: string): Note[] {
        const lowerQuery = query.toLowerCase();
        return this.notes.filter(note => new RegExp(lowerQuery).test(note.content.toLowerCase()));
    }
}

class SortableTodoList extends TodoList {
    sortNotesByStatus(): Note[] {
        return [...this.notes].sort((a, b) => a.status.localeCompare(b.status));
    }

    sortNotesByCreationTime(): Note[] {
        return [...this.notes].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}