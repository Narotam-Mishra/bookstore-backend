import { Book } from "../models/bookstoreModel.js";

// book APIs ---> Endpoints

// post - to create new book in store(DB)
const createBook = async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publisher',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
}

// get - get all books
const getAllBooks = async (req, res) => {
    try{
        const books = await Book.find({});
        console.log(books);
        return res.status(200).json({
         count: books.length,
         data: books
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
}

// Get a book by Id
const getBookById = async (req, res) => {
    try{
        const{id} = req.params;
        const book = await Book.findById(id);
        console.log(book);
        return res.status(200).json(book);
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
}

// update a book
const updateBook = async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
          return res.status(400).send({
            message: 'Send all required fields: title, author, publisher',
          });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
    
        if(!result){
          return res.status(404).json({message : 'Book not found' });
        }
        return res.status(200).send({message: 'Book updated successfully'});
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
}

// delete a book by Id
const deleteBook = async (req, res) => {
    try{
        const { id } = req.params;
        const dBook = await Book.findByIdAndDelete(id);
        if(!dBook){
          return res.status(404).json({message: 'Book not found'});
        }
        console.log(dBook);
        return res.status(200).send({message: 'Book deleted successfully!!'});
      }catch(err){
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
}

export default {createBook, getAllBooks, getBookById, updateBook, deleteBook};
