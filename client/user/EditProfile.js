// Goal -- allow authorized user to edit their profile info
//    form will be the same as signup form
//    path will be '/user/edit/:userId'
//    on load... useEffect will call '.read'
//      1) will verify JWT auth [from auth.isAuthenticated]
//      2) fetch user-info,
//      3) load form w/ info filled
//    Editing the form +  submit = update fetch call w/ userId + data + JWT
//       after successful update -> redirect to profile view w/ updated info

const { Update } = require("@material-ui/icons");

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
