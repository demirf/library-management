import { BaseController } from '../core/base.controller';
import { BookService } from "../services/book.service";
import { Book } from "../entities/Book";

export class BookController extends BaseController<Book> {
  private bookService: BookService;

  constructor() {
    const bookService = new BookService();
    super(bookService);
    this.bookService = bookService;
  }
}
