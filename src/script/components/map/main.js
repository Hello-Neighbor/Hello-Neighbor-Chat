import React from "react"
import { connect } from "react-redux"

import * as Map from "../../actions/Map"
import * as Chat from "../../actions/Chat"

import Chatroom from "../chat/main"
import * as Tag from "./style";
import GoogleMap from "./GoogleMap";
import GoogleApiComponent from "../../utils/GoogleApiComponent"

@connect((store) => {
  return {
    map: store.map,
    chatroom: store.chatroom
  };
})

export class MapInterface extends React.Component {

  constructor(props){
    super(props);
    this.markers = [];
    this.state = {
      showMenu: true,
      hashtagSearch: ""
    }
  }

  geoError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
          case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
          case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
          case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.");
              break;
      }
  }

  getPostion(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          var newLatLngCoord = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({
            'latLng': newLatLngCoord
          }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
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

          var bounds = new window.google.maps.LatLngBounds();
          bounds.extend(newLatLngCoord);
          this.props.map.mapInstance.fitBounds(bounds);
          this.props.dispatch(Map.setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        }, this.geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }

  dropMarker(id, title, position, i) {
      i = i || 0;
      //this.clearMarkers();
      setTimeout(()=>{
        this.addMarker(id, title, position);
      }, i * 300);
  }

  addMarker(id, title, position){
    //var image = 'img/flagred.png';
    var marker = new window.google.maps.Marker({
      map: this.props.map.mapInstance,
      title,
      position,
      //icon: image,
      draggable: false,
      animation: window.google.maps.Animation.DROP
    });
    this.markers.push(marker);

    window.google.maps.event.addListener(marker, 'click', ()=>{
      this.props.dispatch(Map.showChatroom(id, title));
    });
  }

  clearMarkers() {
    this.markers.forEach(function(marker) {
      marker.setMap(null);
    });
    this.markers = [];
  }

  filter(e){
    //console.log(e.target.value)
    this.setState({
      hashtagSearch: e.target.value + "test"
    });
  }

  render() {
    const {map, chatroom} = this.props;
    return (
      <React.Fragment>
        {
          map.activeChatroom.id != null &&
            <Chatroom id={map.activeChatroom.id} title={map.activeChatroom.title} />
        }

        <Tag.Loading loaded={this.props.loaded}>
          <Tag.LoadingScreen></Tag.LoadingScreen>
        </Tag.Loading>
        <Tag.Interface showmenu={this.state.showMenu}>
          <Tag.Menu>
            <Tag.ControlButton onClick={this.getPostion.bind(this)} >Positioning</Tag.ControlButton>
          </Tag.Menu>
          <Tag.Filter>
            <Tag.FilterInput onChange={this.filter.bind(this)} list="hashtags"/>
            <Tag.AutocompleteInput value={this.state.hashtagSearch} />
            <HashTagList chatrooms={chatroom.RoomArr} />
          </Tag.Filter>
        </Tag.Interface>
        <MapContainer
          filter={this.filter.bind(this)}
          loaded={this.props.loaded}
          google={window.google} map={map}
          dropMarker = {this.dropMarker.bind(this)}
        />

      </React.Fragment>
    );
  }
}

const HashTagList = function(props){
  return(
    <datalist id="hashtags">
      {
        props.chatrooms.map((chatroom)=>{
          return chatroom.hashtags.map((hashtag)=>{
            return <option label={hashtag} value={hashtag}></option>
          })
        })
      }
    </datalist>
);
}


const MapContainer = function(props){
  return (
      <React.Fragment>
        <Tag.Map blur={props.loaded}>
          <GoogleMap google={props.google} dropMarker = {props.dropMarker}/>
          <Tag.MapState>
              Zoom level: {props.map.map.zoom}<br />
              Map type: {props.map.map.maptype}<br />
              Latitude: {props.map.location.lat}<br />
              Longtitude: {props.map.location.lng}<br />
              Place: {props.map.location.place_formatted}<br />
              Place ID: {props.map.location.place_id}<br />
              Location: {props.map.location.place_location}<br />
          </Tag.MapState>
        </Tag.Map>
      </React.Fragment>
        );
}

export default GoogleApiComponent({
  apiKey: "AIzaSyA68pRZe0Qtae8ce4kYB05pwKnaFDYW6h0",
  libraries: ['places']
})(MapInterface)
