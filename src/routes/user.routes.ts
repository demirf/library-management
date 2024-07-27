import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { createUpdateUserValidation, returnBookValidation, validate } from "../validators/user.validator";

const router = Router();
const userController = new UserController();

router.post('/', createUpdateUserValidation, validate, userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', createUpdateUserValidation, validate, userController.update);
router.delete('/:id', userController.delete);

router.post('/:userId/borrow/:bookId', userController.borrowBook);
router.post('/:userId/return/:bookId', returnBookValidation, validate, userController.returnBook);

export default router;
