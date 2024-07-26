import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

const tableName = 'borrow_records';

@Entity(tableName)
export class BorrowRecord {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.borrowRecords)
  user: User;

  @ManyToOne(() => Book, book => book.borrowRecords)
  book: Book;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  borrowedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnedAt: Date | null;

  @Column({ type: 'float', nullable: true })
  rating: number;
}

