// Profile component [ProCo] shows single user's info
// user's id is drawn from the url '/user/:userid' path
// ProCo will conditionally show edit/delete options
//   ... will retrieve JWT in read call [isAuthenticated method]
//   ... will be redirected to SignIn if no JWT

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
            <Avatar>
              <Person/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email}/>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={"Joined: " + ( new Date(user.created)).toDateString()}/>
        </ListItem>
      </List>
    </Paper>
  )
}
