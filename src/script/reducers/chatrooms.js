export default function reducer(state={
    RoomArr:[]
  }, action) {
    switch (action.type) {
      case "FETCH_CHAT": {
        return {
          ...state.RoomArr[action.payload.chatId],
        }
      }
      case "SET_CURRENT_MSG": {
        var newObj = {
          ...state
        };
        newObj.RoomArr[action.payload.chatId].currentMessage = action.payload.currentMessage;
        return newObj;
      }
      case "SET_MSG": {
        var newObj = {
          ...state
        };
        newObj.RoomArr[action.payload.chatId].currentMessage = "";
        newObj.RoomArr[action.payload.chatId].message.push(
          {
              messageId: state.RoomArr[action.payload.chatId].message.length,
              content: action.payload.content,
              timestamp: action.payload.timestamp, 
              userId: action.payload.userId
          }
        );
        return newObj;
      }
      case "CREATE_CHATROOM": {
        var newObj = {
          ...state
        };
        newObj.RoomArr.push(
          {
              chatId: state.RoomArr.length,
              message: [],
              currentMessage : "",
              fetching: false,
              fetched: false,
              error: null,
              users:action.payload.users
          }
        );
        return newObj;
      }


    }
    return state
}
