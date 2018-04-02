import styled from 'styled-components';
import React from "react"

export const MapState = styled.div`
	position: absolute;
	padding:10px;
	left: 10px;
	bottom: 10px;
	z-index: 1;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border-radius: 5px;
	display: flex;
	align-items: center;
`;

/*---------------
  Map Interface
---------------*/

export const Interface = styled.div.attrs({
	translatey: props => props.showmenu ? "0px" : "-10vh",
})`
	position: absolute;
	z-index: 1;
	transition: transform 1s;
	width: 100vw;
	transform: translateY(${props => props.translatey});
`;

export const Menu = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 10px;
	right : 10px;
`;

export const ControlButton = styled.button`
	cursor: pointer;
	border: 1px solid transparent;
	border-radius: 100%;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 100px;
	width: 100px;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	transition: all .5s;
	margin-left:20px;
	margin-right:20px;
	&:hover{
		background: rgba(255, 0, 0, .5);
		color: white;
	}
`;

export class Map extends React.Component {

	componentDidMount(){
		this.props.mapInit(this.mapNode);
	}
	render() {
		const {loaded} = this.props;
    return(
			<StyledMap loaded = {loaded} innerRef={map => this.mapNode = map} >
				Loading map...
			</StyledMap>
		);
	}
}

export const StyledMap = styled.div.attrs({
	blur: props => props.loaded ? 10 : 0,
})`
	position:absolute;
	top:0px;
	left:0px;
	height:100%;
	width:100%;
	filter: blur(${props => props.blur}px);
	transition: all .1s;
`;

export const MapContainer = styled.div.attrs({
	blur: props => props.loaded ? 10 : 0,
})`
	position:absolute;
	top:0px;
	left:0px;
	height:100%;
	width:100%;
	filter: blur(${props => props.blur}px);
	transition: all .1s;
`;


/*---------------
  Map Search bar
---------------*/

export const TypeSelector = styled.div`
	color: #fff;
	background-color: #4d90fe;
	padding: 5px 11px 0px 11px;

    border: 1px solid transparent;
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    height: 32px;
    outline: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

`;

export const TypeButton = styled.input.attrs({
	type: "radio",
	name: "type" 
})`
`;

export const TypeLabel = styled.label`
	font-family: Roboto;
	font-size: 13px;
	font-weight: 300;

`;


export const Search = styled.div`
	position: relative;
	margin-top: 20px;
	margin-left: 20px;
	box-sizing: border-box;
	display: flex;
	z-index: 2;

`;


export class LocationSearch extends React.Component {

	componentDidMount(){
		this.props.searchBarInit(this.inputNode);
	}
	render() {
		const {currentmode} = this.props;
    return <SearchBar currentmode = {currentmode} innerRef={input => this.inputNode = input} type='text' placeholder='Enter a location' />
  }
}

const SearchBar = styled.input.attrs({
	currentmode: props => props.currentmode === "Location" ? "inherit" : "none",
})`
	
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	width:400px;

	display: ${props => props.currentmode};
`;

export const Filter = styled.div.attrs({
	currentmode: props => props.currentmode === "Filter" ? "inherit" : "none",
})`
	display:${props => props.currentmode};
`;

export const FilterInput = styled.input.attrs({
	placeholder: 'Enter a hashtag'
})`

	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	width:400px;
	z-index: 11;
`;

export const AutocompleteInput = styled.input.attrs({
	disabled: "disabled"
})`

	position: absolute;
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	width:400px;
	background: transparent;
	z-index: 10;
	color: #AAAAAA;
`;

/*---------------
     Loading
---------------*/


export const Loading = styled.div.attrs({
	loaded: props => props.loaded ? "none" : "initial",
})`
	position: absolute;
	width: 100vw;
	height: 100vh;
	z-index: 1;
	display: ${props => props.loaded}
`;

export const LoadingScreen = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
`;
