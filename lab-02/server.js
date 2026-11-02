const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json());

const databasePath = path.join(__dirname, "database.db");

let db = null;

// GET all books
app.get("/books/", async (request, response) => {
  const books = await db.all("SELECT * FROM book");
  response.send(books);
});

// GET a single book
app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const book = await db.get(
    "SELECT * FROM book WHERE id = ?",
    [bookId]
  );

  if (book === undefined) {
    response.status(404).send({ error: "Book not found" });
  } else {
    response.send(book);
  }
});

// POST a new book
app.post("/books/", async (request, response) => {
  const { title, author, price, pages } = request.body;

  const result = await db.run(
    `INSERT INTO book (title, author, price, pages)
     VALUES (?, ?, ?, ?)`,
    [title, author, price, pages]
  );

  response.status(201).send({
    message: "Book added successfully",
    bookId: result.lastID
  });
});

// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  const result = await db.run(
    `UPDATE book
     SET title = ?, author = ?, price = ?, pages = ?
     WHERE id = ?`,
    [title, author, price, pages, bookId]
  );

  if (result.changes === 0) {
    response.status(404).send({ error: "Book not found" });
  } else {
    response.send({ message: "Book updated successfully" });
  }
});

// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const result = await db.run(
    "DELETE FROM book WHERE id = ?",
    [bookId]
  );

  if (result.changes === 0) {
    response.status(404).send({ error: "Book not found" });
  } else {
    response.send({ message: "Book deleted successfully" });
  }
});

// Initialize database and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database
    });

    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();