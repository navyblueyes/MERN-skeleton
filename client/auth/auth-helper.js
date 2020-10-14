// Define helper methods to store/retrieve JWT cred
// JWT will use browser sessionStorage

// NOTE: remember to clear out sessionStorage on user signout

// authenticate, helper intended to run with signin
// takes in JWT and callback
// stores JWT in sessionStorage; sessionStorage is tied to 'window', be sure to check for no 'undefined' window

import { signout } from './api-auth.js'

const auth = {
  //isAuthenticated() method -- retrieve credentials from `sessionStorage`
  //    returns with JWT ... or false
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  //authenticate() method -- stores jwt `in sessionStorage`
  //    acts as a Wrapper... merely pass in function... function runs as cb
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  // clearJWT() -- removes JWT from sessionStorage
  //    acts as a Wrapper... merely pass in function... function runs as cb
  clearJWT(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}

export default auth
