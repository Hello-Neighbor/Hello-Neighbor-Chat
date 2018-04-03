export default function reducer(state={
    RoomArr:[],
    activeChatroom: {}
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

        var hashtags = action.payload.hashtags.split("#");

        newObj.RoomArr.push(
          {
              chatId: action.payload.id,
              message: [],
              currentMessage : "",
              fetching: false,
              fetched: false,
              error: null,
              user: action.payload.user,
              title: action.payload.title,
              lat: action.payload.lat,
              lng: action.payload.lng,
              hashtags: hashtags.splice(1, hashtags.length-1),
              icon: action.payload.icon
          }
        );
        return newObj;
      }
      case "SET_CHATROOM_STATUS": {
        return {
          ...state,
          activeChatroom: {
            id: action.payload.id,
            title: action.payload.title || state.activeChatroom.title,
            status: action.payload.status
          }
        }
      }


    }
    return state
}
