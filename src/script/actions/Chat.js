
export function fetchChatContent(chatId, user) {
  return {
    type: "FETCH_CHAT",
    payload: {
      chatId,
      user,
    }
  }
}
export function setMsg(chatId, userId, content, timestamp) {
  return {
    type: "SET_MSG",
    payload: {
      chatId,
      userId,
      content,
      timestamp
    }
  }
}

export function setCurrentMsg(chatId, currentMessage) {
  return {
    type: "SET_CURRENT_MSG",
    payload: {
      chatId,
      currentMessage
    }
  }
}

export function createChatroom(id, user, title, lat, lng) {
  return {
    type: "CREATE_CHATROOM",
    payload: {
      id, 
      user, 
      title, 
      lat, 
      lng
    }
  }
}
