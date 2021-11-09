import express from "express";
import supplier from "../controllers/supplier.js";
const router = express.Router();
router.get( "/listSupplier", supplier.listSupplier );
router.post( "/registerSupplier", supplier.registerSupplier );
router.put( "/updateSupplier", supplier.updateSupplier );
router.delete( "/deleteSupplier/:_id", supplier.deleteSupplier );
export default router;