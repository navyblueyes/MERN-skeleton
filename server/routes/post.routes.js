import express from 'express'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import postCtrl from '../controllers/post.controller'

const router = express.Router()

router.route('/api/posts/feed/:userId')
  .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

  //TODO need to complete listNewsFeed

// defining router params
router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.userByID)

export default router
