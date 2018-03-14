export default function reducer(state={
    UserList: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {
          ...state.UserList[action.payload.id],
        }
      }
      case "CREATE_USER": {

        var newObj = {
          ...state
        };
        newObj.UserList.push(
          {
            id: state.UserList.length,
            name: action.payload.name,
            age: action.payload.name,
            image: action.payload.image
          }
        );
        return newObj;
      }
    }

    return state
}
