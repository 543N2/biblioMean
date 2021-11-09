import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
    {
    "name": {type: String},
    "genre":{type: String},
    "author": {type: String},
    "pages": {type: Number},
    "price": {type: Number},
    "publicationYear": {type: String},
    "registerDate": {type: Date, default: Date.now}
    }
);
const book = mongoose.model("books", bookSchema);
export default book;