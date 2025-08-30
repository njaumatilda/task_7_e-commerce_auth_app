import orderModel from "../models/Order.js"
import userModel from "../models/User.js"

const getOrderHistory = async (req, res) => {
  try {
    const { role, userId } = req.user

    const findUser = await userModel.findById(userId)

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    if (role == "admin") {
      const viewAllOrders = await orderModel.find()

      return res.status(200).json(viewAllOrders)
    }

    if (role == "customer") {
      const viewPersonalCustomerOrders = await orderModel.find({
        ownerId: userId,
      })

    //   TODO:why is this part not working
      if (!viewPersonalCustomerOrders.length === 0) {
        return res.status(404).json({
          message: "You don't have any orders",
        })
      }

      res.status(200).json(viewPersonalCustomerOrders)
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { getOrderHistory }
