import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { createUserValidation, returnBookValidation, validate } from "../validators/user.validator";

const router = Router();
const userController = new UserController();

router.post('/', createUserValidation, validate, userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

router.post('/:userId/borrow/:bookId', userController.borrowBook);
router.post('/:userId/return/:bookId', returnBookValidation, validate, userController.returnBook);

export default router;
