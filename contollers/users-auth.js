import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import userModel from "../models/User.js"

const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body

    const checkForExistingEmail = await userModel.findOne({ email })
    if (checkForExistingEmail) {
      return res.status(409).json({
        message: "Email is already in use",
      })
    }

    const newUser = await userModel.create({
      fullName,
      email,
      password: bcrypt.hashSync(password, SALT),
      role,
    })

    res.status(201).json({
      message: "Account created successfully",
      newUser,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const findUser = await userModel.findOne({ email })
    if (!findUser) {
      return res.status(404).json({
        message: "User does not exist",
      })
    }

    const checkForPasswordMatch = await bcrypt.compare(
      password,
      findUser.password
    )
    if (!checkForPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      })
    }

    const token = jwt.sign(
      { userId: findUser.id, email: findUser.email, role: findUser.role },
      JWT_KEY,
      { expiresIn: "3d" }
    )

    res.status(200).json({
      message: "Login was successful",
      token,
      user: {
        userId: findUser.id,
        fullName: findUser.fullName,
        email: findUser.email,
        role: findUser.role,
      },
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { register, login }
