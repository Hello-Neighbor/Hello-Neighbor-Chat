import React from "react"
import * as Tag from "./style";

export default class Mapp extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.google !== this.props.google) {
		  this.loadMap();
		}
	}

	componentDidMount() {
		this.loadMap();
	}
    loadMap() {
    	console.log("gg")
	    if (this.props && this.props.google) {
	      // google is available
	      const {google} = this.props;
	      console.log(google)
	      const maps = google.maps;

	      const node = this.map;

	      let zoom = 14;
	      let lat = 37.774929;
	      let lng = -122.419416;
	      const center = new maps.LatLng(lat, lng);
	      const mapConfig = Object.assign({}, {
	        center: center,
	        zoom: zoom
	      })
	      this.map = new maps.Map(node, {
		      center: {lat: lat, lng: lng},
		      zoom: 13,
		      mapTypeId: 'roadmap',
		   });
	    }
  	}

  render() {
  	const style = {
      width: '100vw',
      height: '100vh'
    }
    return(
      <div style={style} ref={ div => this.map = div } >
        Loading map...
      </div>
    	)
  }
}
