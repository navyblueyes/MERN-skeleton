// client/user/Profile.js

// Profile component [ProCo] shows single user's info
// user's id is drawn from the url '/user/:userid' path
// ProCo will conditionally show edit/delete options
//   ... will retrieve JWT in read call [isAuthenticated method]
//   ... will be redirected to SignIn if no JWT

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

//photoUrl sets up route to retrieve photo based on user ID
// NOTE-- date operation adds a time value to URL to FORCE a rerender
const photoUrl = values.user._id
  ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
  : '/api/users/defaultphoto'

export default function Profile({ match }) {
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)


  // useEffect watches for changes to userId; makes call for read to obtain userId
  // each read returns = ...1) userId ...2) JWT ...3) signal
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated()

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.userId])

  if (redirectToSignin) {
    return <Redirect to='/signin'/>
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}> Profile </Typography> <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl} className={classes.bigAvatar}/>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email}/>
          { auth.isAuthenticated().user && auth.isAuthenticated().user._id == user.id &&
            (<ListItemSecondaryAction>
              <Link to={"/user/edit/" + user._id}>
                <iconButton aria-label="Edit" color="primary">
                  <Edit />
                </iconButton>
              </Link>
              <DeleteUser userId={user._id} />
            </ListItemSecondaryAction>)
          }
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={values.user.about} secondary={"Joined: " + ( new Date(user.created)).toDateString()}/>
        </ListItem>
      </List>
    </Paper>
  )
}
