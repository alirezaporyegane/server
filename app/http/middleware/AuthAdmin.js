const authRestaurant = (req, res, next) => {
  try {
    if (req.user.role === "restaurant") {
      next()
    } else
        return res.status(401).json({ msg: 'you are not admin'})
  } catch (err) {
    console.log(err)
  }
}

module.exports = authRestaurant