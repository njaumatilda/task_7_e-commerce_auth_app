import express from "express"
import {
  getAllProducts,
  getProductsByBrand,
  addProducts,
  deleteProducts,
} from "../contollers/products.js"
import tokenValidator from "../middlewares/token-validation.js"

const router = express.Router()

router.get("/", getAllProducts)

router.get("/:brand/:page/:limit", getProductsByBrand)

router.post("/", tokenValidator, addProducts)

router.delete("/:id", tokenValidator, deleteProducts)

export default router