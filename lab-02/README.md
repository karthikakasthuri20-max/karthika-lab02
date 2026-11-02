# Lab 2: SQLite Database and CRUD Routes

## Student Details
- Name: [Your Name]
- Registration Number: [Your Registration Number]
- Section: [Your Section]

## Objective
Connect an Express server to an SQLite database and perform CRUD operations through HTTP routes.

## Technologies Used
- Node.js
- Express.js
- SQLite
- sqlite3
- Postman
- Nodemon

## Installation

Install dependencies:

```bash
npm install
```

## How to Run

Start the server:

```bash
npm start
```

Server URL:

http://localhost:3000/

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books/ | Get all books |
| GET | /books/:bookId/ | Get a book by ID |
| POST | /books/ | Add a new book |
| PUT | /books/:bookId/ | Update a book |
| DELETE | /books/:bookId/ | Delete a book |

## Database

Database: database.db

Table: book

Columns:
- id
- title
- author
- price
- pages

Initial records: 10 books.

## Screenshots

### GET All Books
![GET All Books](screenshots/Get.png)

### GET Individual Book
![GET Individual Book](screenshots/GetIndividual.png)

### POST - Add Book
![POST](screenshots/Postadd.png)

### PUT - Update Book
![PUT](screenshots/Putupdate.png)

### DELETE - Verify Deletion
![DELETE](screenshots/Delete.png)

## Problems Faced and Solutions

1. SQLite CLI setup was verified using the version command.
2. Postman initially sent an empty request body. This was fixed by selecting Body > raw > JSON.
3. Database connection was established before starting the Express server.

## Notes
All five CRUD endpoints were tested using Postman.
SQL queries use parameterized placeholders to prevent SQL injection.