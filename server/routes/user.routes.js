import express from 'express'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

/* 
    User route setup
        /api/users
            GET list of users
            POST new user
        /api/users/:userid
            GET a user
            PUT for updating a user
            DELETER user
*/

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

// need to call function `userById` with all routes with `userId` parameter
router.param('userId', userCtrl.userByID)

export default router