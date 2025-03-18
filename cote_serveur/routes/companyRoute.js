import express from 'express'
import { addCompany, getAllCompany } from "../controllers/companyController.js"

const router = express.Router()

router.post("/",addCompany)
router.get("/",getAllCompany)

export default router;
