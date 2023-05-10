require("dotenv").config();
require("./db/connection");
const express = require("express");

const book = require("./models/bookmodel");


const app = express();

app.use(express.json())

app.post("/books/addbook", async (req, res) => {
    const result = await book.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    })

    const successReponse = {
        message: "Book successfully added",
        dbresult: result
        }

    res.status(201).send(successReponse)
})

app.get("/books/listbooks", async (req, res) => {
    const listBooks = await book.find({});

    const successReponse = {
        message: "Database Contents:",
        books: listBooks
    };

    res.status(200).send(successReponse)
})

app.put("/books/updatebook", async (req, res) => {
    const updateBook = await book.findOneAndUpdate({title: req.body.searchTitle},
        {author: req.body.updatedAuthor, genre: req.body.updatedGenre});
    const newBook = await book.find({title: req.body.searchTitle})
    const successReponse = {
        message: "The following entry has been successfully updated from:",
        dbentry: updateBook,
        updateMessage: "to the following:",
        newDbEntry: newBook
    };
    const failResponse = {
        message: "The specified entry could not be found."
    }
    if (updateBook !== null) {
        res.status(200).send(successReponse)
    } else {
        res.status(404).send(failResponse)
    }
        
})

app.delete("/books/deletebook", async (req, res) => {
    const deleteBook = await book.findOneAndDelete({title: req.body.title})
    const successReponse = {
        message: `The following entry has been successfully deleted from the database`,
        dbentry: deleteBook
    };
    const failResponse = {
        message: "The specified entry could not be found."
    }
    if (deleteBook !== null) {
        res.status(200).send(successReponse)
    } else {
        res.status(404).send(failResponse)
    }
})

app.delete("/books/deleteallbooks", async (req, res) => {
    const deleteBooks = await book.deleteMany({});

    const successReponse = {
        message: "Entries Deleted:",
        details: deleteBooks
    };

    res.status(200).send(successReponse)
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on Port ${port}`))