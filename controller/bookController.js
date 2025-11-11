import Book from "../model/bookModel.js";
import cloudinary from "../config/cloud.js";

const uploadImage = async (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

// Upload Stream method for file upload
export const addBook = async (req, res) => {
  try {
    const { title, author, price, description, language, stock } = req.body;

    if (!title || !author || !description || !price || !language || !stock) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    let imageUrl;

    if (req.file) {
      try {
        const uploadResult = await uploadImage(req.file.buffer, "books");
        imageUrl = uploadResult.secure_url;
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const newBook = await Book.create({
      title,
      author,
      price,
      description,
      language,
      stock,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      newBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Base64 method for file upload
// export const addBook = async (req, res) => {
//   try {
//     const { title, author, price, description, language, stock } = req.body;
//     if (!title || !author || !description || !price || !language || !stock) {
//       return res.status(400).json({
//         message: "All fields are required!!",
//       });
//     }

//     let imageUrl = undefined;

//     if (req.file) {
//       try {
//         const base64Image = `data:${
//           req.file.mimetype
//         };base64,${req.file.buffer.toString("base64")}`;
//         const uploadResult = await cloudinary.uploader.upload(base64Image, {
//           folder: "books",
//         });
//         imageUrl = uploadResult.secure_url;
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//           success: false,
//           message: "Image upload error",
//         });
//       }
//     }

//     const newBook = await Book.create({
//       title,
//       author,
//       price,
//       description,
//       language,
//       stock,
//       imageUrl,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Book inserted",
//       newBook,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Books not found",
      });
    }
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
