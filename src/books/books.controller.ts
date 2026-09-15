import { Controller, Get } from '@nestjs/common';
import { BooksService } from "./books.service";
import {ShawshankRedemption} from "../data/shawshankRedemption";

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findAll() {
        const book = new ShawshankRedemption();
        this.booksService.createBook(book);
        return this.booksService.findAll();
    }
}