import { UserService } from '../services/user.service';
import { BaseController } from '../core/base.controller';
import { User } from '../entities/User';

export class UserController extends BaseController<User> {
  private userService: UserService;

  constructor() {
    const userService = new UserService();
    super(userService);
    this.userService = userService;
  }
}
