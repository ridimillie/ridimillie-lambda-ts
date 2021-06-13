import { Request, Response, NextFunction, Router } from 'express';
import books from './books';

const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
    console.log('??');
    res.status(200).json('hello worldaa');
});

router.use('/books', books);

export default router;
