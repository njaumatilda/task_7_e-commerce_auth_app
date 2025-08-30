import express from "express"
import { getOrderHistory } from "../contollers/order-history.js"

const router = express.Router()

router.get("/", getOrderHistory)

export default router
