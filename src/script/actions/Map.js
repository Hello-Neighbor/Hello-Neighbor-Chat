export function createMap(instance) {
  return {
    type: "CREATE_MAP",
    payload: {
      instance
    }
  }
}

export function setMap(params) {
  return {
    type: "SET_MAP",
    payload: {
      mapTypeId: params.mapTypeId,
      center: params.center,
      zoom: params.zoom,
      maptype: params.maptype,
      position: params.position
    }
  }
}

export function setLocation(params) {
  return {
    type: "SET_LOCATION",
    payload: {
      place_formatted: params.place_formatted,
      place_id: params.place_id,
      place_location: params.place_location,
      lat: params.lat,
      lng: params.lng
    }
  }
}

export function switchSearchMode(mode) {
  return {
    type: "SWITCH_SEARCH_MODE",
    payload: {
      mode
    }
  }
}

