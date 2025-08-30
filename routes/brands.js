import express from "express"
import {
  getAllBrands,
  addBrands,
  updateBrands,
  deleteBrands,
} from "../contollers/brands.js"
import tokenValidator from "../middlewares/token-validation.js"

const router = express.Router()

router.get("/", getAllBrands)

router.post("/", tokenValidator, addBrands)

router.put("/", tokenValidator, updateBrands)

router.delete("/", tokenValidator, deleteBrands)

export default router
