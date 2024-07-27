import { Repository } from 'typeorm';
import { BaseService } from '../core/base.service';
import { AppDataSource } from '../config';
import { Book } from "../entities/Book";

export class BookService extends BaseService<Book> {
  private bookRepository: Repository<Book>;

  constructor() {
    const bookRepository = AppDataSource.getRepository(Book);
    super(bookRepository);
    this.bookRepository = bookRepository;
  }
}
