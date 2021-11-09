import customer from "../models/customer.js";

const listCustomer = async (request, response) => {
    const customerSchema = await customer.find();
    if (!customerSchema || customerSchema.length == 0) return response.status(400).send("Empty customer list.");
    return response.status(200).send({ customerSchema });
}

const registerCustomer = async (request, response) => {
    let blanks = !request.body.name ||
        !request.body.email ||
        !request.body.password ||
        !request.body.dbStatus
    if (blanks)
        return response.status(400).send("Incomplete data.");
    const existingCustomer = await customer.findOne(
        {
            name: request.body.name,
        }
    );
    if (existingCustomer)
        return response.status(400).send("The customer already exists.")
    const customerSchema = new customer(
        {
            "name": request.body.name,
            "email": request.body.email,
            "password": request.body.password,
            "dbStatus": request.body.dbStatus,
            "registerDate": request.body.registerDate
        }
    );
    const result = await customerSchema.save();
    if (!result)
        return response.status(400).send("Failed to register customer.")
    return response.status(200).send({ result });
};

const updateCustomer = async (request, response) => {

    let blanks = !request.body.name ||
        !request.body.email ||
        !request.body.password ||
        !request.body.dbStatus
    if (blanks)
        return response.status(400).send("Incomplete data.");

    const existingCustomer = await customer.findOne(
        {
            name: request.body.name,
        }
    );
    if (existingCustomer)
        return response.status(400).send("The customer already exists.")

    const customerUpdate = await customer.findByIdAndUpdate(request.body._id,
        {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        }
    );

    return !customerUpdate
        ? response.status(400).send("Error updating customer")
        : response.status(200).send(customerUpdate);
};

const deleteCustomer = async (request, response) => {
    const customerDelete = await customer.findByIdAndDelete({ "_id": request.params["_id"] });
    return !customerDelete
        ? response.status(400).send("Customer not found")
        : response.status(200).send("Customer deleted");
};

export default { listCustomer, registerCustomer, updateCustomer, deleteCustomer };