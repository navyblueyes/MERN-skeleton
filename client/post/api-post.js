// Goal -- Create API for client to connect for retrieving post

const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/posts/feed/'+ params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listByUser = async (req, res) => {
  try {
    let posts = await Post.find({postedBy: req.profile._id})
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec()
    res.json(posts)
  } catch(err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export {
  listNewsFeed,
  listByUser
}
