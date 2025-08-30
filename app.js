import "dotenv/config"
import express from "express"

import { dbConnect } from "./db.js"
import usersRoutes from "./routes/users-auth.js"
import productsRoutes from "./routes/products.js"
import brandsRoutes from "./routes/brands.js"
import ordersRoutes from "./routes/order.js"
import tokenValidator from "./middlewares/token-validation.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/auth", usersRoutes)
app.use("/products", productsRoutes)
app.use("/brands", brandsRoutes)
app.use("/order", tokenValidator, ordersRoutes)

app.get("/", (req, res) => {
  res.json({message: "Deployment successful"})
})

app.listen(PORT, () => {
  console.log(`[server]: App listening on port: ${PORT}`)
  dbConnect()
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
*/
