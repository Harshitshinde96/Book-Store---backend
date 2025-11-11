import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
