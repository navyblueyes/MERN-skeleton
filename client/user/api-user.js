// api-user stores methods for accessing user CRUD API endpoints
// allows client to retrieve user data from server

// C- create - sends POST msg for creating a user
const create = async (user) => {
  try {
    let response = await fetch('./api/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// R - read... or list -- retrieve all users using GET method
// this will be generic information -- no need for security
const list = async (signal) => {
  try {
    let response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// R - read -- retrieve a single user detail using GET method
// getting specific information -- need credentials in header for security
// getting user params --- require params as argument + URL
const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        // NOTE= Bearer scheme for JWT
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


// U - update -- changing a single user data with PUT method
// specific user -- need params in URL
// changing user details -- need security in header
const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        // NOTE= Bearer scheme for JWT
        // removed content-type because server is no longer app/json
      },
      body: user
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


// D - delete -- deleting SPECIFIC user from database - DELETE Method
// deleting user details -- needs to be protected -- credentials in header
// need user details -- params in URL
const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        // NOTE= Bearer scheme for JWT
      },
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// Social Media User API -- Follow / UnFollow


const follow = async (params, credentials, followId) => {
  try {
    let response = await fetch('/api/users/follow/', {
      method: 'PUT', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }, body: JSON.stringify({userId:params.userId, followId: followId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const unfollow = async (params, credentials, unfollowId) => {
  try {
    let response = await fetch('/api/users/unfollow/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }, body: JSON.stringify({
        userId:params.userId,
        unfollowId:unfollowId
      })
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// export CRUD methods
export { create, list, read, update, remove, follow }
