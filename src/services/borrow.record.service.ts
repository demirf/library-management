import { Repository } from 'typeorm';
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
        returnedAt: null
      }
    });

    return borrowRecords || null;
  }
}
