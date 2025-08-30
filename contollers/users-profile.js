import userModel from "../models/User.js"

const getProfile = async (req, res) => {
  try {
    const { userId } = req.user

    const userProfile = await userModel
      .findById(userId)
      .select("fullName email role")

    if (!userProfile) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    res.status(200).json(userProfile)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { getProfile }
