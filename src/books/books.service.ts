import { Injectable } from "@nestjs/common";
import { Book } from "../interfaces/book.interface";

@Injectable()
export class BooksService {
    private books: Book[] = [];

    createBook(book: Book) {
        this.books.push(book);
    }

    findAll(): Book[] {
        return this.books;
    }
}