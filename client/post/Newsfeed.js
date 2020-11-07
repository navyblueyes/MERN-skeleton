import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import PostList from './PostList'
import {listNewsFeed} from './api-post.js'
import NewPost from './NewPost'

// Goal
//    Two main components -- NewPost -- PostList
//    Control state and pass to -- list of posts -- PostList
//    effect for Fetch list of posts
//    function for 1) adding post 2) removing post from list
//    provide the functions to NewPost and PostList

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}))



export default function Newsfeed() {
  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Newsfeed
      </Typography>
      <Divider/>
      <NewPost addUpdate={addPost}/>
      <Divider/>
      <PostList removeUpdate={removePost} posts={posts}/>
    </Card>
  )
}
