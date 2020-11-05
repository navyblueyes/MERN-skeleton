import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

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
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// add photo URL
router.rout('/api/users/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto)
router.rout('/api/users/defaultphoto')
    .get(userCtrl.defaultPhoto)

// Follow + UnFollow Routes
router.route('/api/users/follow')
    .put(authCtrl.requireSignin,
        userCtrl.addFollowing,
        userCtrl.addFollower)

router.route('/api/users/unfollow')
    .put(authCtrl.requireSignin,
        userCtrl.removeFollowing,
        userCtrl.removeFollower)

// Follow API
//   1) fetchs lists of users with "not followed" status
router.route('/api/users/findpeople/:userId')
    .get(authCtrl.requireSignin, userCtrl.findPeople)

// need to call function `userById` with all routes with `userId` parameter
router.param('userId', userCtrl.userByID)

export default router
