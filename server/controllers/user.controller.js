// added formidable for server to read multipart form data
//      gets access to fields / files if any
//      Purpose -- read from filesystem with fs...
//                 store file in photo field in user model

import formidable from 'formidable'
import fs from 'fs'

import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

/*
    defines the callbacks utilized in the user route declarations

*/

// for the router.route('/api/users').post(userCtrl.create)
const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

 // List controller
 //    finds all users
 //    populates a list with `name` `email` `created` `updated` fields
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// The following API endpoints require userID
//      All endpoints will load user from database FIRST [is userID callback],
//      then perform API action []

// userByID
//      requires route to have `:userId` parameter
//      userID callback must ...
//          1. fetch / load user
//          2. call .next to perform next API call

const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next()
        // next() allows user data to be used for controller functions
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

// no need for `id`... the id is within `res.profile`
const read = (req, res) => {
    // need to remove `hashed_password` and `salt` for privacy concerns
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = (req, res) => {
    let form = new formidable.IncomingForm()
                    // ^ formidable reads multipart form data...
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Photo could not be uploaded"
        })
      }
      let user = req.profile
      user = extend(user, fields)
            // ^ extend is a lodash object function that allows you to ...
            //     replace `user` properties with that is different in `req.body
            //     reference: https://tinyurl.com/y3mszo63
      user.updated = Date.now()
      if(files.photo){
        user.photo.data = fs.readFileSync(files.photo.path)
                        // store formidable into fs
        user.photo.contentType = files.photo.type
      }
      try {
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        // need to ensure `hashed_password` and `salt` are empty for privacy concerns
        res.json(user)
        // wrap up changes into res object with res.json
    } catch (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
    })
  }




const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, userByID, read, list, remove, update}
