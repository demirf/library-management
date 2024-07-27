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
      const { userId, bookId } = req.params;

      await this.userService.borrowBook(Number(userId), Number(bookId));

      res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  returnBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, bookId } = req.params;
      const { score } = req.body;

      await this.userService.returnBook(Number(userId), Number(bookId), Number(score));

      res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
