import React from "react"
import { connect } from "react-redux"

import * as Map from "../actions/Map"
import * as Chat from "../actions/Chat"

import Chatroom from "./Chatroom"

@connect((store) => {
  return {
    map: store.map,
    chatroom: store.chatroom
  };
})

export default class MapInterface extends React.Component {

  constructor(props) {
    super(props);
    this.map = null;
    this.API_KEY = "AIzaSyA68pRZe0Qtae8ce4kYB05pwKnaFDYW6h0";
    this.markers = [];
    this.inputNode = {};
    this.mapNode = {};
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

  componentWillReceiveProps(nextProps) {
    this.geocoder = new window.google.maps.Geocoder();
    this.map = new window.google.maps.Map(this.mapNode, {
      center: {lat: nextProps.map.location.lat, lng: nextProps.map.location.lng},
      zoom: 13,
      mapTypeId: 'roadmap',
    });

    // this.map.addListener('zoom_changed', () => {
    //   this.props.dispatch(Map.setMap({
    //     zoom: this.map.getZoom(),
    //   }));
    // });
    //
    // this.map.addListener('drag', (e) => {
    //   this.props.dispatch(Map.setLocation({
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng()
    //   }));
    // });

    this.map.addListener('maptypeid_changed', () => {
      this.props.dispatch(Map.setMap({
        maptype: this.map.getMapTypeId(),
      }));
    });

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
      // Clear out the old markers.
      this.markers.forEach(function(marker) {
        marker.setMap(null);
      });
      this.markers = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        this.dropMarker(place.place_id, place.name, place.geometry.location);

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


    //add chatroom marker
    console.log(nextProps.chatroom)
    nextProps.chatroom.RoomArr.map((val)=>{
      var newLatLng = new google.maps.LatLng(val.lat, val.lng);
      this.dropMarker("212", val.title, newLatLng);
    })

  }

  componentDidMount(){
    this.inputNode = document.getElementsByClassName('pac_input')[0];
    this.mapNode = document.getElementsByClassName('map')[0];

  }

  dropMarker(id, title, position) {
    var neighborhoodsLength = 1;
    for (var i = 0; i < neighborhoodsLength ; i++) {
      setTimeout(()=>{
        this.addMarker(id, title, position);
      }, i * 200);
    }
  }

  addMarker(id, title, position){
    //var image = 'img/flagred.png';
    var marker = new window.google.maps.Marker({
      map: this.map,
      title,
      position,
      //icon: image,
      draggable: false,
      animation: google.maps.Animation.DROP
    });
    this.markers.push(marker);

    window.google.maps.event.addListener(marker, 'click', ()=>{
      this.props.dispatch(Map.showChatroom(id, title));
    });

  }

  getPostion(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          var newLatLngCoord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          this.geocoder.geocode({
            'latLng': newLatLngCoord
          }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                this.dropMarker(results[1].place_id, results[1].formatted_address, newLatLngCoord);
              } else {
                alert('No results found');
                return;
              }
            } else {
              alert('Geocoder failed due to: ' + status);
              return;
            }
          });

          var bounds = new google.maps.LatLngBounds();
          bounds.extend(newLatLngCoord);
          this.map.fitBounds(bounds);
          this.props.dispatch(Map.setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }


  render() {
    const {map} = this.props;
    return (
      <React.Fragment>
        {
          map.activeChatroom.map((val)=>{
            console.log(map)
            return <Chatroom id={val.id} title={val.title} />
          })
        }
        <div className="map__container">
          <div className='map__container__state'>
              Zoom level: {map.map.zoom}<br />
              Map type: {map.map.maptype}<br />
              Latitude: {map.location.lat}<br />
              Longtitude: {map.location.lng}<br />
              Place: {map.location.place_formatted}<br />
              Place ID: {map.location.place_id}<br />
              Location: {map.location.place_location}<br />
              <button className="map__container__state__positioningBtn" onClick={this.getPostion.bind(this)}>Positioning</button>
          </div>
          <input className='pac_input' type='text' placeholder='Enter a location' />
          <div className='map' />
        </div>
      </React.Fragment>
    );
  }
}
