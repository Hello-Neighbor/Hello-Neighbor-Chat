export function createUser(name, age, image) {
  return {
    type: 'CREATE_USER',
    payload: {
   		name,
   		age,
      image
    }
  }
}


export function fetchUser(id) {
  return {
    type: "FETCH_USER",
    payload: {
      id
    }
  }
}
