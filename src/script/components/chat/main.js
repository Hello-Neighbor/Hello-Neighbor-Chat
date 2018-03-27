import React from "react"
import { connect } from "react-redux"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as Chat from "../../actions/Chat"
import * as User from "../../actions/User"
import * as Time from "../../utils/time"

import * as Tag from "./style";

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
    // this.props.dispatch(Chat.createChatroom(this.props.id, this.username));
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
    return (<Tag.Chatroom>
      <Tag.ChatroomHeader><h2>{this.props.title}</h2></Tag.ChatroomHeader>
      <Tag.ChatroomContainer>
        <ReactCSSTransitionGroup transitionName="message" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          {
            currentChatroom.message.map((val)=>{
              return <Messages val={val} user={user} userId={this.userId}/>
            })
          }
        </ReactCSSTransitionGroup>
      </Tag.ChatroomContainer>
      <Tag.SubmitbarContainer><Tag.Submitbar onKeyPress={this.handleKeyPress.bind(this)} value = {currentChatroom.currentMessage} onChange = {this.onInputMessage.bind(this)} /><Tag.Submit onClick = {this.sendMessage.bind(this, currentChatroom.currentMessage)}>Submit</Tag.Submit></Tag.SubmitbarContainer>
    </Tag.Chatroom>);
  }
}


function SentMessage(props){
  return (
    <Tag.MessageContainer className="float--right" key={props.val.id}>
      <Tag.Message>
        <Tag.MessageContent>{props.val.content}</Tag.MessageContent>
      </Tag.Message>
      <Tag.SentTime>{props.val.timestamp}</Tag.SentTime>
    </Tag.MessageContainer>
  );
}

function ReceiveMessage(props){
  return (
    <Tag.MessageContainer className="float--left" key={props.val.id}>
      <Tag.Message>
        <Tag.UserIcon><Tag.UserImage src={require(`../../../images/${props.userImage}`)} /></Tag.UserIcon>
        <Tag.MessageContent>{props.val.content}</Tag.MessageContent>
      </Tag.Message>
      <Tag.SentTime>{props.val.timestamp}</Tag.SentTime>
    </Tag.MessageContainer>
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
