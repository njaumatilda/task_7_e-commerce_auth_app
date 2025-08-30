import express from "express"
import { getProfile } from "../contollers/users-profile.js"

const router = express.Router()

router.get("/", getProfile)

export default router