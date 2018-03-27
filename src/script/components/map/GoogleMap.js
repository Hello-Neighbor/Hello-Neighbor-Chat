import React from "react"
import { connect } from "react-redux"

import * as Tag from "./style";
import * as Map from "../../actions/Map"
import * as Chat from "../../actions/Chat"

@connect((store) => {
  return {
    map: store.map,
    chatroom: store.chatroom
  };
})

export default class GoogleMap extends React.Component {

	constructor(props){
		super(props);
		this.map = null;
		this.inputNode = {};
	}

	componentWillMount() {
    this.props.dispatch(Map.setMap({
      zoom: 13,
      mapTypeId: 'roadmap'
    }));
    this.props.dispatch(Map.setLocation({
      lat: -33.8688,
      lng: 151.2195,
      place_formatted: '',
      place_id: '',
      place_location: '',
    }));

    //for prototyping

    this.props.dispatch(Chat.createChatroom(0, "johnhckuo", "Running", -33.8788, 151.2295));
    this.props.dispatch(Chat.createChatroom(1, "johnhckuo", "Coding", -33.8388, 151.2495));
    this.props.dispatch(Chat.createChatroom(2, "johnhckuo", "Mountain Climbing", -33.9, 151.3));
    this.props.dispatch(Chat.createChatroom(3, "johnhckuo", "Bicycling", -33.88, 151.2095));

  }

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.google !== this.props.google) {
		  this.loadMap();
		}
	}

	componentDidMount() {
		this.loadMap();
	}

  loadMap() {
		const { map } = this.props;
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;
      let zoom = map.map.zoom;
      let lat = map.location.lat;
      let lng = map.location.lng;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(this.mapNode, mapConfig);
			this.props.dispatch(Map.createMap(this.map));

			this.registerEvent();
			this.autoComplete();

	    this.props.chatroom.RoomArr.map((val, i)=>{
	      var newLatLng = new google.maps.LatLng(val.lat, val.lng);
				this.props.dropMarker(val.chatId, val.title, newLatLng, i);
	    })

    }
	}

	autoComplete(){

		this.inputNode = document.getElementsByClassName('pac_input')[0];
		// initialize the autocomplete functionality using the #pac-input input box
		var searchBox = new google.maps.places.SearchBox(this.inputNode);
		this.map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(this.inputNode);
		let autoComplete = new window.google.maps.places.Autocomplete(this.inputNode);

		// Bias the SearchBox results towards current map's viewport.
		this.map.addListener('bounds_changed', ()=>{
			searchBox.setBounds(this.map.getBounds());
		});
		searchBox.addListener('places_changed', () => {
			var places = searchBox.getPlaces();
			if (places.length == 0 ){
				return;
			}

			// For each place, get the icon, name and location.
			var bounds = new google.maps.LatLngBounds();
			places.forEach((place) => {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				this.props.dropMarker(place.place_id, place.name, place.geometry.location);

				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}

				this.props.dispatch(Map.setLocation({
					place_formatted: this.inputNode.value,
					place_id: place.place_id,
					place_location: place.geometry.location.toString(),
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng()
				}));
			});
			this.map.fitBounds(bounds);
		});
	}

	registerEvent(){
		  this.map.addListener('drag', (e) => {
		    this.props.dispatch(Map.setLocation({
		      lat: e.latLng.lat(),
		      lng: e.latLng.lng()
		    }));
		  });

		  this.map.addListener('maptypeid_changed', () => {
		    this.props.dispatch(Map.setMap({
		      mapTypeId: this.map.getMapTypeId(),
		    }));
		  });

		  this.map.addListener('zoom_changed', () => {
		    this.props.dispatch(Map.setMap({
		      zoom: this.map.getZoom(),
		    }));
		  });
	}

  render() {
  	const style = {
      width: '100vw',
      height: '100vh'
    }
    return(
			<React.Fragment>
				<Tag.MapSearch ref = {input => this.inputNode = input } className='pac_input' type='text' placeholder='Enter a location' />
	      <div style={style} ref={ div => this.mapNode = div }>
	        Loading map...
	      </div>
			</React.Fragment>
    	)
  }
}
