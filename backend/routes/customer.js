import express from "express";
import customer from "../controllers/customer.js";
const router = express.Router();
router.post( "/registerCustomer", customer.registerCustomer );
export default router;