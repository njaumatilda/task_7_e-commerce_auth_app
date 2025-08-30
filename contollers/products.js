import productModel from "../models/Product.js"
import brandModel from "../models/Brand.js"
import { mongoose } from "../db.js"

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find()

    res.status(200).json(allProducts)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getProductsByBrand = async (req, res) => {
  try {
    const { brand, page, limit } = req.params

    const checkForValidId = mongoose.Types.ObjectId.isValid(brand)
    if (!checkForValidId) {
      return res.status(400).json({
        message: "Invalid ID format",
      })
    }

    // TODO: this part is not working as expected
    if (!brand) {
      return res.status(404).json({
        message: "Brand does not exist",
      })
    }

    const checkForProducts = await productModel.find()

    // TODO: this one is also not working as expected
    if (!checkForProducts) {
      return res.status(404).json({
        message: "There are no products associated with this brand",
      })
    }

    const brandProducts = await productModel.paginate(
      { brand: brand },
      {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 2,
        populate: "brand",
      }
    )

    res.status(200).json({
      message: "Product(s) retrieved successfully",
      brandProducts,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const addProducts = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      aboutBrand,
      country,
      socialLinks,
      website,
      category,
      cost,
      productImages,
      description,
      stockStatus,
    } = req.body

    const { role, userId } = req.user
    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to add products",
      })
    }

    let findBrand = await brandModel.findOne({ brandName })

    if (!findBrand) {
      findBrand = await brandModel.create({
        brandName,
        aboutBrand,
        country,
        socialLinks,
        website,
      })
    }

    const newProduct = await productModel.create({
      productName,
      brand: findBrand._id,
      ownerId: userId,
      category,
      cost,
      productImages,
      description,
      stockStatus,
    })

    res.status(201).json({
      message: "Product added successfully",
      newProduct,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteProducts = async (req, res) => {
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
        message: "You don't have the permissions to delete products",
      })
    }

    const findProductToDelete = await productModel.findById({ _id: id })
    if (!findProductToDelete) {
      return res.status(404).json({
        message: "Product does not exist",
      })
    }

    const deletedProduct = await productModel.findByIdAndDelete(id)
    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { getAllProducts, getProductsByBrand, addProducts, deleteProducts }
