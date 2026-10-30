
const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// Get all books using async/await
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving all books:", error.response?.data || error.message);
    throw error;
  }
}

// Get book by ISBN using Promise
function getBooksByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error("ISBN error:", error.response?.data || error.message);
      throw error;
    });
}

// Get books by author using async/await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Author error:", error.response?.data || error.message);
    throw error;
  }
}

// Get books by title using async/await
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(
      `${BASE_URL}/title/${encodeURIComponent(title)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Title error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
