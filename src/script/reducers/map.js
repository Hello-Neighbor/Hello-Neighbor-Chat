export default function reducer(state={
    activeChatroom:{},
    map:{},
    location:{}
  }, action) {
    //console.log("---------------- Action receive! ----------------"+ action.type)
    switch (action.type) {
      case "SET_ACTIVE_CHATROOM": {
        return {
          ...state,
          activeChatroom: {
            id: action.payload.id, 
            title: action.payload.title
          }
        }
      }
      case "SET_MAP": {
        return {
          ...state,
          map:{
            mapTypeId: action.payload.mapTypeId || state.map.mapTypeId,
            center: action.payload.center || state.map.center,
            zoom: action.payload.zoom || state.map.zoom,
            maptype: action.payload.maptype || state.map.maptype,
            position: action.payload.position || state.map.position
          }
        }
      }
      case "SET_LOCATION": {
        return {
          ...state,
          location:{
            place_formatted: action.payload.place_formatted || state.location.place_formatted,
            place_id: action.payload.place_id || state.location.place_id,
            place_location: action.payload.place_location || state.location.place_location,
            lat: action.payload.lat || state.location.lat,
            lng: action.payload.lng || state.location.lng
          }
        }
      }
    }
    return state
}
