import { BaseController } from '../core/base.controller';
import { BorrowRecordService } from "../services/borrow.record.service";
import { BorrowRecord } from "../entities/BorrowRecord";

export class BorrowRecordController extends BaseController<BorrowRecord> {
  private borrowRecordService: BorrowRecordService;

  constructor() {
    const borrowRecordService = new BorrowRecordService();
    super(borrowRecordService);
    this.borrowRecordService = borrowRecordService;
  }
}
