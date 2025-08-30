import orderModel from "../models/Order.js"
import productModel from "../models/Product.js"
import { mongoose } from "../db.js"

const getAllOrders = async (req, res) => {
  try {
    const { role } = req.user

    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to view orders",
      })
    }

    const allOrders = await orderModel.find()

    res.status(200).json(allOrders)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params

    const checkForValidId = mongoose.Types.ObjectId.isValid(id)
    if (!checkForValidId) {
      return res.status(400).json({
        message: "Invalid ID format",
      })
    }

    const { role } = req.user

    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to view orders",
      })
    }

    const singleOrder = await orderModel.findById({ _id: id })

    if (!singleOrder) {
      return res.status(404).json({
        message: "Order does not exist",
      })
    }

    res.status(200).json(singleOrder)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const makeOrder = async (req, res) => {
  try {
    const { role, userId } = req.user

    if (role !== "customer") {
      return res.status(401).json({
        message: "You don't have the permissions to create orders",
      })
    }

    const { productName, quantity, shippingStatus } = req.body

    const findProduct = await productModel.findOne({ productName })

    if (!findProduct) {
      return res.status(404).json({
        message: "Product does not exist",
      })
    }

    const totalCost = findProduct.cost * quantity

    const newOrder = await orderModel.create([
      {
        productName,
        productId: findProduct.id,
        ownerId: userId,
        quantity,
        totalCost,
        shippingStatus,
      },
    ])

    res.status(201).json({
      message: "Order created successfully",
      newOrder,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params

    const checkForValidId = mongoose.Types.ObjectId.isValid(id)
    if (!checkForValidId) {
      return res.status(400).json({
        message: "Invalid ID format",
      })
    }

    const { role } = req.user

    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to change orders' status",
      })
    }

    const { shippingStatus } = req.body

    const findOrder = await orderModel.findById({ _id: id })

    if (!findOrder) {
      return res.status(404).json({
        message: "Order does not exist",
      })
    }

    const allowedValues = ["pending", "shipped", "delivered"]

    if (!allowedValues.includes(shippingStatus)) {
      return res.status(400).json({
        message: "Invalid order status value",
      })
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      { _id: id },
      { shippingStatus },
      { new: true }
    )

    res.status(200).json({
      message: "Order status updated successfully",
      updatedOrder,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { getAllOrders, getSingleOrder, makeOrder, changeOrderStatus }
