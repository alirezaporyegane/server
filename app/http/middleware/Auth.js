const jwt = require('jsonwebtoken');
const config = require('config');

const authUser = (req, res, next) => {
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

module.exports = authUser

