import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './error.controller'

/* 
    defines the callbacks utilized in the user route declarations

*/

// for the router.route('/api/users').post(userCtrl.create)
const create = async (res, res) => { 
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
 
const list = (res, res) => { }
const userByID = (res, res, next, id) => { }
const read = (res, res) => { }
const update = (res, res, next) => { }
const remove = (res, res, next) => { }

export default { create, userByID, read, list, remove, update}