import supplier from "../models/supplier.js";

const listSupplier = async (request, response) => {
    const supplierSchema = await supplier.find();
    if(!supplierSchema || supplierSchema.length==0) return response.status(400).send("Empty supplier list.");
    return response.status(200).send( {supplierSchema} );
}

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

const updateSupplier = async (request, response) => {

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

    const supplierUpdate = await supplier.findByIdAndUpdate(request.body._id,
        {
            name: request.body.name,
            address: request.body.address,
        }
    );

    return !supplierUpdate
        ? response.status(400).send("Error updating supplier")
        : response.status(200).send(supplierUpdate);
};

const deleteSupplier = async (request, response) => {
    const supplierDelete = await supplier.findByIdAndDelete({ "_id": request.params["_id"] });
    return !supplierDelete
        ? response.status(400).send("Supplier not found")
        : response.status(200).send("Supplier deleted");
};

export default { listSupplier, registerSupplier, updateSupplier, deleteSupplier };