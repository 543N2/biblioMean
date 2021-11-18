import customer from "../models/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

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

    const hash = await bcrypt.hash(request.body.password, 10);
    console.log("Este es el hash: ", hash);

    const customerSchema = new customer(
        {
            "name": request.body.name,
            "email": request.body.email,
            "password": hash,
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
        !request.body.dbStatus
    if (blanks)
        return response.status(400).send("Incomplete data.");

    let pass = "";
    if(request.body.password) {
        pass = await bcrypt.hash(request.body.password, 10);
    }
    else {
        const customerFind = customer.findOne( {email: request.body.email});
        pass = userFind.password;
    }

    const existingCustomer = await customer.findOne(
        {
            name: request.body.name,
            email: request.body.email
        }
    );
    if (existingCustomer)
        return response.status(400).send("You didn't make any changes")

    const customerUpdate = await customer.findByIdAndUpdate(request.body._id,
        {
            name: request.body.name,
            email: request.body.email,
            password: pass,
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

const login = async (request, response) => {
    if (!request.body.email || !request.body.password)
        return response.status(400).send({ message: "Incomplete data" });

    const customerLogin = await customer.findOne({ email: request.body.email });
    if (!customerLogin)
        return response.status(400).send({ message: "Wrong email or password" });

    const hash = await bcrypt.compare(request.body.password, customerLogin.password);
    if (!hash)
        return response.status(400).send({ message: "Wrong email or password" });


    try {
        return response.status(200).json({
            token: jwt.sign(
                {
                    _id: customerLogin._id,
                    name: customerLogin.name,
                    email: customerLogin.email,
                    iat: moment().unix()
                },
                process.env.SECRET_KEY
            )
        })
    } catch (e) {
        return response.status(400).send({ message: "Login error" }, e)
    }

};

export default {
    listCustomer,
    registerCustomer,
    updateCustomer,
    deleteCustomer,
    login
};