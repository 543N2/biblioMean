import supplier from "../models/supplier.js";
const registerSupplier = async (request, response) => {
    let blanks = !request.body.name || !request.body.address
    if (blanks)
        return response.status(400).send("Incomplete data.");
    const existingSupplier = await supplier.findOne(
        {
            name: request.body.name,
        }
    );
    if (existingSupplier)
        return response.status(400).send("The supplier already exists.")
    const supplierSchema = new supplier(
        {
            "name": request.body.name,
            "address": request.body.address,
            "registerDate": request.body.registerDate
        }
    );
    const result = await supplierSchema.save();
    if (!result)
        return response.status(400).send("Failed to register supplier.")
    return response.status(200).send( {result} );
};
export default { registerSupplier };