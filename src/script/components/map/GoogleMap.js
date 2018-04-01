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
		this.state = {
			hashtagSearch : ""
		};

		//prototype
		this.user = "johnhckuo";
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

    this.props.dispatch(Chat.createChatroom(0, this.user, "Running", -33.8788, 151.2295, "#sport#running"));
    this.props.dispatch(Chat.createChatroom(1, this.user, "Coding", -33.8388, 151.2495, "#coding#indoor"));
    this.props.dispatch(Chat.createChatroom(2, this.user, "Mountain Climbing", -33.9, 151.3, "#sport#outdoor"));
    this.props.dispatch(Chat.createChatroom(3, this.user, "Bicycling", -33.88, 151.2095, "#sport#single"));

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
			let zoom = map.map.zoom;
			let lat = map.location.lat;
			let lng = map.location.lng;
			const center = new window.google.maps.LatLng(lat, lng);
			const mapConfig = Object.assign({}, {
			center: center,
			zoom: zoom,
			disableDoubleClickZoom: true
			})
			this.map = new window.google.maps.Map(this.mapNode, mapConfig);
			this.props.dispatch(Map.createMap(this.map));

			this.registerEvent();
			this.autoComplete();

	    this.props.chatroom.RoomArr.map((val, i)=>{
		    var newLatLng = new window.google.maps.LatLng(val.lat, val.lng);
			this.props.dropMarker(val.chatId, val.title, newLatLng, i);
	    })

		}
	}

  searchBarInit(node){
    this.inputNode = node;
  }

	autoComplete(){
    // initialize the autocomplete functionality using the #pac-input input box
		var searchBox = new window.google.maps.places.SearchBox(this.inputNode);
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
			var bounds = new window.google.maps.LatLngBounds();
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
		this.map.addListener('drag', () => {
			this.props.dispatch(Map.setLocation({
			  lat: this.map.getCenter().lat(),
			  lng: this.map.getCenter().lng()
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

		this.map.addListener('dblclick', (e)=>{
			var chatroom = prompt("Please enter the name of chatrooom");
      if (chatroom != null) {
      var hashtags = prompt("Please enter the hashtag of the chatrooom", "e.g. #sport #running");
        if (hashtags != null){
          hashtags = hashtags.replace(/\s/g,'');
          var id = this.props.chatroom.RoomArr.length;
          this.props.dispatch(Chat.createChatroom(id, this.user, chatroom, e.latLng.lat(), e.latLng.lng(), hashtags));
          this.props.dropMarker(id, chatroom, e.latLng);
        }
			}
		});
	}

	changeSearchMode(e){
		this.props.dispatch(Map.switchSearchMode(e.target.value));
	}

	filterMarker(currentSearch){
		this.props.clearMarkers();
			this.props.chatroom.RoomArr.map((val, i)=>{
			  val.hashtags.map((hashtag)=>{
			    if (hashtag === currentSearch){
			      var newLatLng = new window.google.maps.LatLng(val.lat, val.lng);
			      this.props.addMarker(val.chatId, val.title, newLatLng, i);
			      return;
			    }
			  })
		})
	}

	filter(e){
		this.setState({
		  hashtagSearch: e.target.value + ""
		});
		this.filterMarker(e.target.value);
	}

	render() {
		const {chatroom} = this.props;
		const style = {
		  width: '100vw',
		  height: '100vh'
		}
		return(
				<React.Fragment>
					<Tag.Search>
						<Tag.Select onChange={this.changeSearchMode.bind(this)}>
							<option>Location</option>
							<option>Filter</option>
						</Tag.Select>
						<Tag.LocationSearch currentmode={this.props.map.searchMode} searchBarInit = {this.searchBarInit.bind(this)} />
						<Tag.Filter currentmode={this.props.map.searchMode}>
				                <Tag.FilterInput onChange={this.filter.bind(this)} list="hashtags"/>
				                <Tag.AutocompleteInput value={this.state.hashtagSearch} />
				                <HashTagList chatrooms={chatroom.RoomArr} />
				        </Tag.Filter>
					</Tag.Search>
			      	<div style={style} ref={ div => this.mapNode = div }>
			        	Loading map...
			      	</div>
				</React.Fragment>
		);
	}

}

const HashTagList = function(props){
  var currentHashtags = {};
  return(
    <datalist id="hashtags">
      {
        props.chatrooms.map((chatroom)=>{
          return chatroom.hashtags.map((hashtag)=>{
            if (currentHashtags[hashtag] == undefined){
              currentHashtags[hashtag] = true;
              return <option label={hashtag} value={hashtag}></option>
            }
          })
        })
      }
    </datalist>
  );
}
