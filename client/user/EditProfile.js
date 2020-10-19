// Goal -- allow authorized user to edit their profile info
//    form will be the same as signup form
//    path will be '/user/edit/:userId'
//    on load... useEffect will call '.read'
//      1) will verify JWT auth [from auth.isAuthenticated]
//      2) fetch user-info,
//      3) load form w/ info filled
//    Editing the form +  submit = update fetch call w/ userId + data + JWT
//       after successful update -> redirect to profile view w/ updated info

import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'

const { Update } = require("@material-ui/icons");


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function EditProfilt({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    redirectToProfile: false,
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, email: data.email})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()
      const user = {
        name: values.name || undefined,
        email: values.email || undefined,
        password: values.password || undefined
      }
      update({
        userId: match.params.userId
      }, {
        t: jwt.token
      }, user).then((data) => {
        if (data && data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, userId: data._id, redirectToProfile: true})
        }
      })
    if (values.redirectToProfile) {
      return (<Redirect to={'/user/' + values.userId} />)
    }
  }


}