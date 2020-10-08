//client signin/signout methods

//signin --
// 1) takes user data from view
// 2) uses fetch to make POST call
// 3) Verify user with backend
const signin = async (user) => {
  try {
    let response = await fetch('/auth/signin/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// signout
// uses fetch to make GET call to server
const signout = async (user) => {
  try {
    let response = await fetch('/auth/signout/', {method: 'GET'})
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {signin, signout}
