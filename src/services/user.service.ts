import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { BaseService } from '../core/base.service';
import { AppDataSource } from '../config';

export class UserService extends BaseService<User> {
  private userRepository: Repository<User>;

  constructor() {
    const userRepository = AppDataSource.getRepository(User);
    super(userRepository);
    this.userRepository = userRepository;
  }
}
