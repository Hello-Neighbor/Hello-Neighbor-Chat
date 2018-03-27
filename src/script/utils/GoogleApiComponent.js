import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'

import cache from './ScriptCache'
import GoogleApi from './GoogleApi'

const defaultMapConfig = {}
export const GoogleApiComponent = (options) => (WrappedComponent) => {
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];

  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        loaded: false,
        map: null,
        google: null
      }
    }

    componentDidMount() {
      this.scriptCache.google.onLoad((err, tag) => {
        const maps = window.google.maps;
        const props = Object.assign({}, this.props, {
          loaded: this.state.loaded
        });
        let center = new maps.LatLng(this.props.lat, this.props.lng)

        let mapConfig = Object.assign({}, defaultMapConfig, {
          center, zoom: this.props.zoom
        })

        this.map = new maps.Map(this.map, mapConfig);

        this.setState({
          loaded: true,
          map: this.map,
          google: window.google
        })
      });
    }

    componentWillMount() {
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey: apiKey,
          libraries: libraries
        })
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        map: this.state.map,
        google: this.state.google,
        mapComponent: this.map
      })
      return (
        <div>
          <WrappedComponent {...props} />
          <div ref={ div => this.map = div } />
        </div>
      )
    }
  }

  return Wrapper;
}

export default GoogleApiComponent;
