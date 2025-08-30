import brandModel from "../models/Brand.js"

const getAllBrands = async (req, res) => {
  try {
    const brands = await brandModel.find()

    res.status(200).json(brands)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const addBrands = async (req, res) => {
  try {
    const { brandName, aboutBrand, country, socialLinks, website } = req.body

    const { role } = req.user
    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to add brands",
      })
    }

    const findBrand = await brandModel.findOne({ brandName })
    if (findBrand) {
      return res.status(409).json({
        message: "Brand already exists",
      })
    }

    const newBrand = await brandModel.create({
      brandName,
      aboutBrand,
      country,
      socialLinks,
      website,
    })

    res.status(200).json({
      message: "Brand added successfully",
      newBrand,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const updateBrands = async (req, res) => {
  try {
    const { brandName, ...updatedFields } = req.body

    const { role } = req.user
    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to add brands",
      })
    }

    const findBrandToUpdate = await brandModel.findOneAndUpdate(
      { brandName },
      { ...updatedFields },
      { new: true }
    )
    if (!findBrandToUpdate) {
      return res.status(404).json({
        message: "Brand does not exist",
      })
    } else {
      //TODO: response sends successful update even when i send the same body/fields without changes, how do i work on that
      res.status(200).json({
        message: "Brand updated successfully",
        findBrandToUpdate,
      })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteBrands = async (req, res) => {
  try {
    const { brandName } = req.query

    const { role } = req.user
    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to delete brands",
      })
    }

    const findBrandToDelete = await brandModel.findOneAndDelete({ brandName })
    if (!findBrandToDelete) {
      return res.status(404).json({
        message: "Brand does not exist",
      })
    } else {
      res.status(200).json({
        message: "Brand deleted successfully",
        findBrandToDelete,
      })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { getAllBrands, addBrands, updateBrands, deleteBrands }
