import { UserService } from '../services/user.service';
import { BaseController } from '../core/base.controller';
import { User } from '../entities/User';
import { Request, Response } from 'express';

export class UserController extends BaseController<User> {
  private userService: UserService;

  constructor() {
    const userService = new UserService();
    super(userService);
    this.userService = userService;
  }

  borrowBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      const bookId = req.params.bookId;

      await this.userService.borrowBook(parseInt(userId), parseInt(bookId));

      res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
