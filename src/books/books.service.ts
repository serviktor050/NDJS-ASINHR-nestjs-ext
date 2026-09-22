import { Injectable } from "@nestjs/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Book, BookDocument} from "./schemas/book.schema";
import {Connection, HydratedDocument, Model, QueryWithHelpers} from "mongoose";
import {CreateBookDto} from "./interfaces/dto/create-book";
import {UpdateBookDto} from "./interfaces/dto/update-book";

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection,
    ) {}

    create(data: CreateBookDto): Promise<BookDocument> {
        const book = new this.BookModel(data);
        return book.save();
    }

    getAll(): Promise<BookDocument[]> {
        return this.BookModel.find().exec();
    }

    update(id:string, data: UpdateBookDto): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findOneAndUpdate(
            {_id: id},
            data,
        );
    }

    delete(id: string): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findOneAndDelete({ _id: id });
    }
}