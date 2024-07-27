import { appEventEmitter } from './eventEmitter';
import { BookService } from "../services/book.service";
import { BorrowRecordService } from "../services/borrow.record.service";

appEventEmitter.on('bookReturned', async (bookId: number) => {
  const bookService = new BookService();
  const borrowRecordService = new BorrowRecordService();
  const averageRating = await borrowRecordService.getAverageRatingByBookId(bookId);

  await bookService.update(bookId, { averageRating })
});




