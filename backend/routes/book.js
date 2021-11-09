import express from "express";
import book from "../controllers/book.js";
const router = express.Router();
router.get( "/listBook", book.listBook );
router.post( "/registerBook", book.registerBook );
router.put( "/updateBook", book.updateBook);
router.delete( "/deleteBook/:_id", book.deleteBook);
export default router;