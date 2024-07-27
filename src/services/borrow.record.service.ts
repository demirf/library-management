import { IsNull, Repository } from 'typeorm';
import { BaseService } from '../core/base.service';
import { AppDataSource } from '../config';
import { BorrowRecord } from "../entities/BorrowRecord";

export class BorrowRecordService extends BaseService<BorrowRecord> {
  private borrowRecordRepository: Repository<BorrowRecord>;

  constructor() {
    const borrowRecordRepository = AppDataSource.getRepository(BorrowRecord);
    super(borrowRecordRepository);
    this.borrowRecordRepository = borrowRecordRepository;
  }

  async existingBorrowRecord(userId: number, bookId: number): Promise<BorrowRecord | null> {
    const borrowRecords = await this.borrowRecordRepository.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
        returnedAt: IsNull()
      }
    });

    return borrowRecords || null;
  }

  async getAverageRatingByBookId(bookId: number): Promise<number> {
    // Using query builder to calculate the average rating directly
    const result = await this.borrowRecordRepository
      .createQueryBuilder('borrowRecord')
      .select('AVG(borrowRecord.rating)', 'averageRating')
      .where('borrowRecord.bookId = :bookId', { bookId })
      .andWhere('borrowRecord.returnedAt IS NOT NULL')
      .getRawOne();

    return parseFloat(result.averageRating) || 0; // Handle null or empty results
  }
}
