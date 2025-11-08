import express from "express";
import { addBook, getAllBooks, getBook } from "../controller/bookController.js";
import { upload } from "../middleware/upload.middleware.js";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/addbook", protectRoute, isAdmin, upload.single("image"), addBook);
router.get("/", getAllBooks);
router.get("/:id", getBook);

export default router;
