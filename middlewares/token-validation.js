import jwt from "jsonwebtoken"

const JWT_KEY = process.env.JWT_KEY

const tokenValidator = (req, res, next) => {
  try {
    const { authorization } = req.headers
    let token = authorization

    if (!token) {
      return res.status(400).json({
        message: "Validation token is missing",
      })
    }

    if (token.includes("Bearer")) {
      token = token.split(" ")[1]

      const decodedToken = jwt.verify(token, JWT_KEY)
      req.user = decodedToken
      next()
    } else {
      res.status(422).json({
        message: "Invalid authentication type",
      })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export default tokenValidator
