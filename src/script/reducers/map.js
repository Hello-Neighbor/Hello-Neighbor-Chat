export default function reducer(state={
    map:{},
    location:{},
    mapInstance: null,
    searchMode: "Location"
  }, action) {
    //console.log("---------------- Action receive! ----------------"+ action.type)
    switch (action.type) {
      case "CREATE_MAP": {
        return {
          ...state,
          mapInstance: action.payload.instance
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
      case "SWITCH_SEARCH_MODE": {
        return {
          ...state,
          searchMode: action.payload.mode
        }
      }
    }
    return state
}
