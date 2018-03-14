import React from "react"
import { connect } from "react-redux"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as Chat from "../actions/Chat"
import * as User from "../actions/User"
import * as Time from "../utils/time"

@connect((store) => {
  return {
    user: store.user,
    chatroom: store.chatroom
  };
})
export default class Chatroom extends React.Component {

  constructor(props){
    super(props);
    this.chatRoomId = 0;
    this.username = "johnhckuo";
    this.otherusername = "zaza";
    this.userId = 0;
    this.otherUserId = 1;
  }

  componentWillMount() {
    this.props.dispatch(Chat.createChatroom(this.username));
    this.props.dispatch(Chat.createChatroom(this.otherusername));
    this.props.dispatch(User.createUser(this.username, 22, ""));
    this.props.dispatch(User.createUser(this.otherusername, 26, "zaza.png"));
  }

  shouldComponentUpdate(nextProps, nextState){
    const differentCurrentValue = this.props.chatroom.RoomArr[this.chatRoomId].currentMessage != nextProps.chatroom.RoomArr[this.chatRoomId].currentMessage;
    return !differentCurrentValue;
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.sendMessage.call(this, e.target.value);
    }
  }

  sendMessage(currentMessage){
    this.props.dispatch(Chat.setMsg(this.chatRoomId, this.userId, currentMessage, Time.currentTime()));
    this.props.dispatch(Chat.setMsg(this.chatRoomId, this.otherUserId, "What?", Time.currentTime()));
  }

  onInputMessage(e){
    this.props.dispatch(Chat.setCurrentMsg(this.chatRoomId, e.target.value));
  }

  render() {
    const { chatroom, user } = this.props;
    const currentChatroom = chatroom.RoomArr[this.chatRoomId];
    return (<div className="chatroom">
      <div className = "chatroom__header"><h2>Chatroom #1</h2></div>
      <div className = "chatroom__chatContainer">
        <ReactCSSTransitionGroup transitionName="message" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          {
            currentChatroom.message.map((val)=>{
              return <Messages val={val} user={user} userId={this.userId}/>
            })
          }
        </ReactCSSTransitionGroup>
      </div>
      <div className = "chatroom__submitBarContainer" ><input onKeyPress={this.handleKeyPress.bind(this)} value = {currentChatroom.currentMessage} onChange = {this.onInputMessage.bind(this)} className = "chatroom__submitBarContainer__submitBar" /><button onClick = {this.sendMessage.bind(this, currentChatroom.currentMessage)}>Submit</button></div>
    </div>);
  }
}


function SentMessage(props){
  return (
    <div className="chatroom__chatContainer__messageContainer float--right" key={props.val.id}>
      <div className="chatroom__chatContainer__messageContainer__message">
        <div className = "chatroom__chatContainer__messageContainer__message__messageContent">{props.val.content}</div>
      </div>
      <div className = "chatroom__chatContainer__messageContainer__sentTime">{props.val.timestamp}</div>
    </div>
  );
}

function ReceiveMessage(props){
  return (
    <div className="chatroom__chatContainer__messageContainer float--left" key={props.val.id}>
      <div className="chatroom__chatContainer__messageContainer__message">
        <div className = "chatroom__chatContainer__messageContainer__message__userIcon"><img src={require(`../../images/${props.userImage}`)} /></div>
        <div className = "chatroom__chatContainer__messageContainer__message__messageContent">{props.val.content}</div>
      </div>
      <div className = "chatroom__chatContainer__messageContainer__sentTime">{props.val.timestamp}</div>
    </div>
  );
}

function Messages(props){
  var message;

  if (props.val.userId === props.userId){
    message = <SentMessage val={props.val} />;
  }else{
    var userImage = props.user.UserList[props.val.userId].image;
    message = <ReceiveMessage userImage={userImage} val={props.val}/>;
  }
  return message;
}
