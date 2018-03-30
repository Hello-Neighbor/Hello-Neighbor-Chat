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
		height: 130px;
		width: 130px;
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

export const MapSearch = styled.input`
	margin-top: 10px;
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 32px;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	width:600px;
`;

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

export const Interface = styled.div.attrs({
	showmenu: props => props.showmenu ? "initial" : "none",
})`
	position: absolute;
	width: 100vw;
	height: 10vh;
	z-index: 1;
	display: ${props => props.showmenu}
`;

export const Menu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 1);
`;

export const Filter = styled.div`
	display:flex;
	justify-content: center;
	align-items: center;
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
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	width:600px;
	background: transparent;
	z-index: 10;
	color: #AAAAAA;
`;
