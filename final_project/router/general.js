
const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;

const public_users = express.Router();

// Register a new user
public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: 'User already exists!' });
  }

  users.push({ username, password });

  return res.status(200).json({
    message: 'User successfully registered. Now you can login'
  });
});

// Get all books
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// Get book by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  return res.status(200).json(book);
});

// Get books by author
public_users.get('/author/:author', (req, res) => {
  const author = decodeURIComponent(req.params.author).toLowerCase();

  const result = Object.entries(books)
    .filter(([isbn, book]) =>
      book.author.toLowerCase() === author
    )
    .map(([isbn, book]) => ({ isbn, ...book }));

  return res.status(200).json(result);
});

// Get books by title
public_users.get('/title/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title).toLowerCase();

  const result = Object.entries(books)
    .filter(([isbn, book]) =>
      book.title.toLowerCase() === title
    )
    .map(([isbn, book]) => ({ isbn, ...book }));

  return res.status(200).json(result);
});

// Get book reviews
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (Object.keys(book.reviews).length === 0) {
    return res.status(200).json({
      message: 'No reviews found for this book.'
    });
  }

  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
