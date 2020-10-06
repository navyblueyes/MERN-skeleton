import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

const signin = (req, res) => {
  try {
    // pull email from req and send database a request for email
    let user = await User.findOne({ "email": req.body.email})

    if (!user)
      // error check for no user found
      return res.status('401').json({ error: "User not found"})

    if (!user.authenticate(req.body.password)) {
      // error check for matching password
      return res.status('401').send({ error: "Email and password don't match."})
    }

    // if all the if-clauses are passed...
    // jwt is signed based on user's id, assigned as `token`
    const token = jwt.sign({ _id: user._id }, config.jwtSecret)
    // `token` is attached to `res` under property of `cookie`
    res.cookie('t', token, { expire: new Date() + 9999 })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    return res.status('401').json({ error: "Could not sign in"})
  }
}
const signout = (req, res) => {
  // signout is used to clear data of user
  // must clear out cookie
  res.clearCookie("t")
  // send response of success
  return res.status('200').json({
    message: "signed out"
  })
}

//
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.authenticate && req.profile._is == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is NOT authorized"
    })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization }
