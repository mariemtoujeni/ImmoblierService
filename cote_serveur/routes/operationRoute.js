import express from 'express'
import {addOperation, getAllOperation} from "../controllers/operationController.js"

const router = express.Router()

router.post('/',addOperation)
router.get('/', getAllOperation)

export default router;