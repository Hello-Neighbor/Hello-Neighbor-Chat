import styled from 'styled-components';

export const MapState = styled.div`
	position: absolute;
	padding:10px;
	left: 10px;
	bottom: 10px;
	z-index: 100;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border-radius: 5px;
	display: flex;
	align-items: center;
`;

export const PositioningBtn = styled.button`
	cursor: pointer;
	margin-left: 30px;
	border: 1px solid transparent;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	height: 100px;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

export const Map = styled.div`
	position:absolute;
	top:0px;
	left:0px;
	height:100%;
	width:100%;
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