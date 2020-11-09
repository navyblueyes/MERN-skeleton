import express from 'express'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import postCtrl from '../controllers/post.controller'

const router = express.Router()

// Route that GET all posts for NewsFeed
router.route('/api/posts/feed/:userId')
  .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

// Route that GET post by A SPECIFIC USER
router.route('/api/posts/by/:userId')
  .get(authCtrl.requireSignin, postCtrl.listByUser)


  //TODO need to complete listNewsFeed

// defining router params
router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.userByID)

export default router
