import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { BooksService } from "./books.service";
import {BookDocument} from "./schemas/book.schema";
import {CreateBookDto} from "./interfaces/dto/create-book";
import {ParamId} from "./interfaces/param-id";
import {UpdateBookDto} from "./interfaces/dto/update-book";
import {HydratedDocument, QueryWithHelpers} from "mongoose";

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    create(@Body() body: CreateBookDto): Promise<BookDocument> {
        return this.booksService.create(body);
    }

    @Get()
    getAll(): Promise<BookDocument[]> {
        return this.booksService.getAll();
    }

    @Put(':id')
    update(
        @Param() {id}: ParamId,
        @Body() body: UpdateBookDto,
    ): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.booksService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param() { id }: ParamId): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.booksService.delete(id);
    }

}