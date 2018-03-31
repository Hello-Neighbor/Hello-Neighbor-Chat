import styled from 'styled-components';

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

export const Map = styled.div.attrs({
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

export const Search = styled.div`
	position: absolute;
	margin-top: 20px;
	margin-left: 20px;
	box-sizing: border-box;
	z-index: 2;

`;

export const Select = styled.select`
	background: transparent;
	border: none;
	font-size: 14px;
	height: 29px;
	padding: 5px; 
	color: #fff;

	-webkit-border-radius: 20px;
	-moz-border-radius: 20px;
	border-radius: 20px;
	background-color: #3b8ec2;

`;

export const LocationSearch = styled.input.attrs({
	currentmode: props => props.currentmode === "Location" ? "inherit" : "none",
})`
	margin-top: 10px;
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	width:600px;
	display: ${props => props.currentmode};
`;

export const Filter = styled.div.attrs({
	currentmode: props => props.currentmode === "Filter" ? "inherit" : "none",
})`
	margin-top: 10px;
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	display:${props => props.currentmode};
`;

export const FilterInput = styled.input`
	position: absolute;
	margin-top: 10px;
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	width:600px;
	background: transparent;
	z-index: 11;
`;

export const AutocompleteInput = styled.input.attrs({
	disabled: "disabled"
})`
	position: absolute;
	margin-top: 10px;
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	width:600px;
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



