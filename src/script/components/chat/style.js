import styled from 'styled-components';

export const Chatroom = styled.div`
	position:absolute;
	z-index:1000;
	right: 0px;
	bottom: 0px;
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	flex-direction: column;
	width: 40vw;
	height: 40vh;
	box-sizing: border-box;
`;

export const ChatroomHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width:100%;
	height: auto;
	background: rgba(0, 0, 255, 0.5);
	padding: 20px;
	box-sizing: border-box;
`;

export const SubmitbarContainer = styled.div`
	position: relative;
	display: flex;
	width:100%;
	height: auto;
	box-sizing: border-box;
	padding-left: 30px;
	padding-right: 30px;
	margin-bottom: 20px;
	bottom: 0px;
`;

export const Submitbar = styled.input`
	width: 100%;
	margin-left: 5px;
	margin-right: 5px;
`;

export const Submit = styled.button`
	float: right;
`;

export const ChatroomContainer = styled.div`
	width:100%;
	height:100%;
	overflow-y: scroll;
	padding:20px;
	box-sizing: border-box;
	color: white;
`;

export const MessageContainer = styled.div.attrs({
  float: props => props.float || 'initial',
})`
	clear: both;
  	float: ${props => props.float};
`;


export const Message = styled.div`
	display: flex;
	margin-bottom: 10px;

`;

export const UserIcon = styled.div`
	float:left;
	display: inline;
`;

export const UserImage = styled.img`
	border-radius: 100%;
	width: 50px;
	height: auto;
`;

export const MessageContent = styled.div`
	display: inline;
	background: rgba(0, 0, 255, 0.5);
	padding:10px;
	border-radius: 15px;
`;

export const SentTime = styled.div`
	color: #999999;
`;