import express from "express";
import customer from "../controllers/customer.js";
const router = express.Router();
router.get( "/listCustomer", customer.listCustomer );
router.post( "/registerCustomer", customer.registerCustomer );
router.post( "/login", customer.login );
router.put( "/updateCustomer", customer.updateCustomer );
router.delete( "/deleteCustomer/:_id", customer.deleteCustomer );
export default router;