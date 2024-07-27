import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { BaseService } from '../core/base.service';
import { AppDataSource } from '../config';
import { BorrowRecordService } from "./borrow.record.service";
import { BookService } from "./book.service";

export class UserService extends BaseService<User> {
  private userRepository: Repository<User>;
  private borrowRecordService: BorrowRecordService;
  private bookService: BookService;

  constructor() {
    const userRepository = AppDataSource.getRepository(User);
    super(userRepository);
    this.userRepository = userRepository;
    this.borrowRecordService = new BorrowRecordService();
    this.bookService = new BookService();
  }

  async borrowBook(userId: number, bookId: number): Promise<void> {
    // Find the user and book
    const user = await this.userRepository.findOneBy({ id: userId });
    const book = await this.bookService.findOne(bookId);

    if (!user || !book) {
      throw new Error('User or book not found');
    }

    const existingBorrowRecord = await this.borrowRecordService.existingBorrowRecord(userId, bookId);

    if (!!existingBorrowRecord) {
      throw new Error('User has already borrowed this book');
    }

    await this.borrowRecordService.create({
      user,
      book
    });
  }
}
