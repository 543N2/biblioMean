import book from "../models/book.js";
const registerBook = async (request, response) => {
    let blanks = !request.body.name ||
        !request.body.genre ||
        !request.body.author ||
        !request.body.pages ||
        !request.body.price ||
        !request.body.publicationYear
    if (blanks)
        return response.status(400).send("Incomplete data.");
    const existingBook = await book.findOne(
        {
            name: request.body.name,
        }
    );
    if (existingBook)
        return response.status(400).send("The Book already exists.")
    const bookSchema = new book(
        {
            "name": request.body.name,
            "genre": request.body.genre,
            "author": request.body.author,
            "pages": request.body.pages,
            "price": request.body.price,
            "publicationYear": request.body.publicationYear,
            "registerDate": request.body.registerDate
        }
    );
    const result = await bookSchema.save();
    if (!result)
        return response.status(400).send("Failed to register Book.")
    return response.status(200).send({ result });
};

const listBook = async (request, response) => {
    const bookSchema = await book.find();
    if(!bookSchema || bookSchema.length==0) return response.status(400).send("Empty book list.");
    return response.status(200).send( {bookSchema} );
}

export default { registerBook, listBook };