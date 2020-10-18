// Profile component [ProCo] shows single user's info
// user's id is drawn from the url '/user/:userid' path
// ProCo will conditionally show edit/delete options
//   ... will provide JWT in the fetch call
//   ... will be redirected to SignIn if no JWT

export default function Profile({ match }) {
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)


  // useEffect watches for changes to userId; makes call for read to obtain userId
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.usAuthenticated()
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
}
