import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';
import { BorrowRecord } from './BorrowRecord';

const tableName = 'books';

@Entity(tableName)
export class Book {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @OneToMany(() => BorrowRecord, borrowRecord => borrowRecord.book)
  borrowRecords: BorrowRecord[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
