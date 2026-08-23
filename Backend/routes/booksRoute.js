import express from "express";
import { Book } from "../models/BookModel.js";

const router = express.Router();

/**
 * Pull only the fields we allow clients to write, so a request can never
 * overwrite _id, timestamps or anything else unexpected.
 */
const pickBookFields = (body = {}) => {
  const out = {};

  if (body.title !== undefined) out.title = String(body.title).trim();
  if (body.author !== undefined) out.author = String(body.author).trim();
  if (body.publishYear !== undefined) out.publishYear = Number(body.publishYear);
  if (body.description !== undefined) out.description = String(body.description).trim();
  if (body.story !== undefined) out.story = String(body.story);
  if (body.coverImage !== undefined) out.coverImage = String(body.coverImage);
  if (body.genre !== undefined) out.genre = String(body.genre).trim();

  if (body.pages !== undefined) {
    const n = Number(body.pages);
    out.pages = body.pages === "" || body.pages === null || Number.isNaN(n) ? null : n;
  }

  return out;
};

/** Validate the three required fields. Returns an error string, or null. */
const validateRequired = ({ title, author, publishYear }) => {
  if (!title || !author || publishYear === undefined || publishYear === null) {
    return "Send all required fields: title, author, publishYear";
  }
  if (Number.isNaN(Number(publishYear))) {
    return "publishYear must be a number";
  }
  return null;
};

//Route for Save a new Book
router.post("/", async (req, res) => {
  try {
    const payload = pickBookFields(req.body);

    const invalid = validateRequired(payload);
    if (invalid) {
      return res.status(400).send({ message: invalid });
    }

    const book = await Book.create(payload);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for get All Books from database:
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route fo the get one book from the database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for the Update the books
router.put("/:id", async (req, res) => {
  try {
    const payload = pickBookFields(req.body);

    const invalid = validateRequired(payload);
    if (invalid) {
      return res.status(400).send({ message: invalid });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({
      message: "Book updated successfully",
      book: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Delete a book with mongoose
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
