
const express = require("express");
const axios = require("axios");

const router = express.Router();
const BASE_URL = "http://localhost:5000";

// Get all books
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books",
      error: error.message
    });
  }
});

// Get books by author
router.get("/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;

    const result = Object.entries(books)
      .filter(([isbn, book]) =>
        book.author.toLowerCase() === author.toLowerCase()
      )
      .map(([isbn, book]) => ({ isbn, ...book }));

    if (result.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books by author",
      error: error.message
    });
  }
});

// Get books by title
router.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;

    const result = Object.entries(books)
      .filter(([isbn, book]) =>
        book.title.toLowerCase() === title.toLowerCase()
      )
      .map(([isbn, book]) => ({ isbn, ...book }));

    if (result.length === 0) {
      return res.status(404).json({ message: "Title not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books by title",
      error: error.message
    });
  }
});

// Get book by ISBN
router.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(books[isbn]);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving book by ISBN",
      error: error.message
    });
  }
});

module.exports = router;
