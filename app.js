import "dotenv/config"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import jwt from "jsonwebtoken"

import { dbConnect } from "./db.js"
import usersRoutes from "./routes/users-auth.js"
import productsRoutes from "./routes/products.js"
import brandsRoutes from "./routes/brands.js"
import ordersRoutes from "./routes/orders.js"
import usersProfileRoutes from "./routes/users-profile.js"
import orderHistoryRoutes from "./routes/order-history.js"
import tokenValidator from "./middlewares/token-validation.js"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "GET,POST,PUT,PATCH,DELETE",
  },
})

const JWT_KEY = process.env.JWT_KEY
const PORT = process.env.PORT

app.use(express.json())

// TODO: can this be put in the middlewares like the tokenValidator
io.use((socket, next) => {
try {
    const { authorization } = socket.handshake.headers
    let token = authorization

    if (!token) {
      return next(new Error("Validation token is missing"))
    }

    if (token.includes("Bearer")) {
      token = token.split(" ")[1]

      const decodedToken = jwt.verify(token, JWT_KEY)
      socket.handshake.auth.user = decodedToken
      console.log(socket.handshake.auth.user)
      next()
    } else {
      return next(new Error("Invalid authentication type"))
    }
  } catch (error) {
    return next(new Error(error.message))
  }
})

app.use((req, res, next) => {
  req.io = io, 
  next()
})

app.use("/auth", usersRoutes)
app.use("/products", productsRoutes)
app.use("/brands", brandsRoutes)
app.use("/order", tokenValidator, ordersRoutes)
app.use("/profile", tokenValidator, usersProfileRoutes)
app.use("/order-history", tokenValidator, orderHistoryRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Deployment successful" })
})

httpServer.listen(PORT, () => {
  console.log(`[express-server]: App listening on port: ${PORT}`)
  dbConnect()
})

io.on("connection", (socket) => {
  console.log(
    `[socket.io-server]: Connected: Handshake established on port: ${PORT}`
  )

  const user = socket.handshake.auth.user
    
  socket.join(user.userId)

  socket.on("disconnect", () => {
    console.log(
      `[socket.io-server]: Disconnected: Handshake closed from port: ${PORT}`
    )
  })
})

/*
TODO: For the next tasks:
+ use real email addresses for users to verify
+ add input validations for the req bodies
+ use role-based authorization as a middleware to prevent repetition
+ see if i can add images and store externally eg. for brand logos
+ how do i add type of currency to cost when it accepts numbers only
+ when you try to delete a brand, check if it has products first, and if yes don't delete the brand. 
+ use id to delete brand
+ change the logic for creating a brand when creating products in the product route
+ implement the other todos that i didn't push from my task 6
*/
