import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    totalCost: {
      type: Number,
      required: true,
      trim: true,
    },
    shippingStatus: {
      type: String,
      required: true,
      enum: ["pending", "shipped", "delivered"],
      trim: true,
    },
  },
  { timestamps: true, strict: true }
)

export default mongoose.model("order", orderSchema)
