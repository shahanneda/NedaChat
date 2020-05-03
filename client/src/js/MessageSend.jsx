import React, {Component} from "react";
import adapter from 'webrtc-adapter';

import VideoChat from './VideoChat.jsx';
class MessageSend extends Component{
        constructor(props){
                super(props)

                this.messageBoxOnChange = this.messageBoxOnChange.bind(this);
                this.handleButtonClick = this.handleButtonClick.bind(this);
                this.state = {
                        currentMessageBoxValue:"",
                        videoChatOn:false,
                };
        }

        messageBoxOnChange(event){
                this.setState({currentMessageBoxValue: event.target.value});
        }

        handleButtonClick(){
                if(this.props.currentChat == null || this.state.currentMessageBoxValue.localeCompare("") == 0){
                        return;
                }
                this.props.socket.emit("newMessage", {
                        id:  Date.now() + this.props.username  + this.props.currentChat.id,
                        chatId: this.props.currentChat.id,
                        fromUserName:this.props.username,
                        messageBody: this.state.currentMessageBoxValue,
                        time: Date.now(),
                }); 
                console.log("sent message");
                this.setState({currentMessageBoxValue:""})
        }
        keyPress = (e) => {
                if(e.keyCode == 13){
                        e.target.value = "";
                        this.handleButtonClick();
                }
        }
        render(){
                return(
                        <div className="bottom-bar">
                          {this.state.videoChatOn ? <VideoChat /> : ""}
                                <div className="message-send-wrapper input-group ">
                                        <div className="video-chat-footer-wrapper input-group-btn">
                                          <button className="join-video-chat-button btn btn-primary mr-2"  onClick={() => this.setState({videoChatOn:true})}>
                                                    Join VideoChat
                                                </button>
                                        </div>

                                        <div className="message-input-box-wrapper">
                                                <input className="input-box form-control" type="text" onKeyDown={this.keyPress} value={this.state.currentMessageBoxValue} onChange={this.messageBoxOnChange}/>
                                        </div>

                                        <div className="send-button-wrapper input-group-btn">
                                                <button className="send-button btn btn-primary"  onClick={this.handleButtonClick}>
                                                        Send           
                                                </button>
                                        </div>
                                </div>
                        </div>

                );

        }

}

export default MessageSend;
