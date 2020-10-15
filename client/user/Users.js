import React, {useState, useEffect} from 'react'
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
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-user.js'

//makeStyles is a hook from Material-UI
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}))

export default function Users() {
  const classes = useStyles()
    // useState declares users with an empty array
  const [users, setUsers] = useState([])

    // useEffect
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    //Call `list` function from `api-user.js`
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })
    // added cleanup function to abort fetch... when component mounts
    return function cleanup(){
      abortController.abort()
    }
  // at the end... pass an empty array to ensure cleanup() runs ONLY ONCE
  }, [])


    return (
      // Paper, List, ListItem are from Material-UI
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          All Users
        </Typography>
        <List dense>
        {/* mapping through each user retrieved through UseEffect's list() */}
        {users.map((item, i) => {
          return <Link to={"/user/" + item._id} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Person/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name}/>
              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForward/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        })}
        </List>
      </Paper>
    )
}
