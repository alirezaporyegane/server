const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({
    success: false,
    msg: 'Auth Failed'
  })

  try {
    const User = jwt.verify(token, config.get('jwtPrivetKey'))
    req.user = User;
    next()
  }
  catch (err) {
    res.status(401).json({
      msg: 'شما اجازه دسترسی به این دیتا را ندارید'
    })
  }
}

const authAdmin = (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      next()
    } else
        return res.status(401).json({ msg: 'you are not admin'})
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  auth,
  authAdmin
}

