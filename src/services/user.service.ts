import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { BaseService } from '../core/base.service';
import { AppDataSource } from '../config';
import { BorrowRecordService } from "./borrow.record.service";
import { BookService } from "./book.service";
import { appEventEmitter } from "../events/eventEmitter";

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
    const user = await this.userRepository.findOneBy({id: userId});
    const book = await this.bookService.findOne(bookId);

    if (!user || !book) {
      throw new Error('User or book not found');
    }

    const existingBorrowRecord = await this.borrowRecordService.existingBorrowRecord(userId, bookId);

    if (!!existingBorrowRecord) {
      throw new Error('User has already borrowed this book');
    }

    await this.borrowRecordService.create({user, book});
  }

  async returnBook(userId: number, bookId: number, score: number): Promise<void> {
    const borrowRecord = await this.borrowRecordService.existingBorrowRecord(userId, bookId);

    if (!borrowRecord) {
      throw new Error('No active borrow record found for this user and book.');
    }

    await this.borrowRecordService.update(borrowRecord.id, {returnedAt: new Date(), rating: score});

    // Emit the event to update the book's average rating
    appEventEmitter.emit('bookReturned', bookId, score);
  }

  async findOne(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['borrowRecords', 'borrowRecords.book']
    });

    if (!user) {
      throw new Error('User not found');
    }

    const pastBorrowRecords = user.borrowRecords
      .filter(record => !!record.returnedAt)
      .map(record => ({
        name: record.book.name,
        averageRating: record.book.averageRating,
        userRating: record.rating
      }));

    const currentBorrowRecords = user.borrowRecords
      .filter(record => !record.returnedAt)
      .map(record => ({
        name: record.book.name,
        averageRating: record.book.averageRating
      }));

    return {
      name: user.name,
      pastBorrowedBooks: pastBorrowRecords,
      currentlyBorrowedBooks: currentBorrowRecords
    };
  }
}
