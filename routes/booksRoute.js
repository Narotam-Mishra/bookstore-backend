import express from 'express';
import product_api  from '../controller/book_api.js';

const router = express.Router();

// book-store-app's routes
router
    .post('/createBook', product_api.createBook)
    .get('/getBooks', product_api.getAllBooks)
    .get('/getBookById/:id', product_api.getBookById)
    .put('/updateBook/:id', product_api.updateBook)
    .delete('/deleteBook/:id', product_api.deleteBook)

export default router;
