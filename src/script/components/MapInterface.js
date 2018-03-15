import React from "react"
import { connect } from "react-redux"

import * as Map from "../actions/Map"
import Chatroom from "./Chatroom"

@connect((store) => {
  return {
    map: store.map
  };
})

export default class MapInterface extends React.Component {

  constructor(props) {
    super(props);
    this.map = null;
    this.API_KEY = "AIzaSyA68pRZe0Qtae8ce4kYB05pwKnaFDYW6h0";
    this.markers = [];
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
  }

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder();
    this.map = new window.google.maps.Map(document.getElementsByClassName('map')[0], {
      center: {lat: this.props.map.location.lat, lng: this.props.map.location.lng},
      zoom: 13,
      mapTypeId: 'roadmap',
    });
    this.map.addListener('zoom_changed', () => {
      this.props.dispatch(Map.setMap({
        zoom: this.map.getZoom(),
      }));
    });

    this.map.addListener('drag', (e) => {
      this.props.dispatch(Map.setLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }));
    });

    this.map.addListener('maptypeid_changed', () => {
      this.props.dispatch(Map.setMap({
        maptype: this.map.getMapTypeId(),
      }));
    });

    let marker = new window.google.maps.Marker({
      map: this.map,
      position: {lat: this.props.map.location.lat, lng: this.props.map.location.lng},
    });

    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementsByClassName('pac_input')[0];
    var searchBox = new google.maps.places.SearchBox(inputNode);
    this.map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

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

        let location = place.geometry.location;
        this.props.dispatch(Map.setLocation({
          place_formatted: inputNode.value,
          place_id: place.place_id,
          place_location: location.toString(),
        }));

      });
      this.map.fitBounds(bounds);
    });

  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
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
      console.log("clicked")
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
        <div className="map__container">
          <div className='map__container__state'>
              Zoom level: {map.map.zoom}<br />
              Map type: {map.map.maptype}<br />
              Latitude: {map.location.lat.toFixed(5)}<br />
              Longtitude: {map.location.lng.toFixed(5)}<br />
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
