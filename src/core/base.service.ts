import { Repository } from 'typeorm';

export class BaseService<T> {
  constructor(private repository: Repository<T>) {}

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
