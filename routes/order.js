import express from "express"
import {
  getAllOrders,
  getSingleOrder,
  makeOrder,
  changeOrderStatus,
} from "../contollers/order.js"


const router = express.Router()

router.get("/", getAllOrders)

router.get("/:id", getSingleOrder)

router.post("/", makeOrder)

router.patch("/:id", changeOrderStatus)

export default router
