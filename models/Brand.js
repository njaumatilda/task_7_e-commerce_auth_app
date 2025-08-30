import mongoose from "mongoose"

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    aboutBrand: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    socialLinks: {
      type: [String],
      default: null,
      trim: true,
    },
    website: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true, strict: true }
)

export default mongoose.model("brand", brandSchema)
