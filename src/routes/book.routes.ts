import { Router } from 'express';
import { BookController } from "../controllers/book.controller";
import { createUpdateBookValidation, validate } from "../validators/book.validator";

const router = Router();
const bookController = new BookController();

router.post('/', createUpdateBookValidation, validate, bookController.create);
router.get('/', bookController.findAll);
router.get('/:id', bookController.findOne);
router.put('/:id', createUpdateBookValidation, validate, bookController.update);
router.delete('/:id', bookController.delete);

export default router;
