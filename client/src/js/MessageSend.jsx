import React, {Component} from "react";

class MessageSend extends Component{
        constructor(props){
                super(props)

                this.messageBoxOnChange = this.messageBoxOnChange.bind(this);
                this.handleButtonClick = this.handleButtonClick.bind(this);
                this.state = {
                        currentMessageBoxValue:"",
                };
        }

        messageBoxOnChange(event){
                this.setState({currentMessageBoxValue: event.target.value});
        }

        handleButtonClick(){
                console.log("sent message");
                if(this.props.currentChat == null){
                        return;
                }
                this.props.socket.emit("newMessage", {
                        id:  Date.now() + this.props.username  + this.props.currentChat.id,
                        chatId: this.props.currentChat.id,
                        fromUserName:this.props.username,
                        messageBody: this.state.currentMessageBoxValue,
                        time: Date.now(),
                }); 
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
                                <div className="message-send-wrapper input-group ">
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
