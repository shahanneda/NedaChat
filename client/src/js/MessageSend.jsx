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
               this.props.socket.emit("newMessage", {
                        id: this.props.username + Date.now() + "Group1",
                        chatName: "Group 1",
                        fromUserName:this.props.username,
                        messageBody: this.state.currentMessageBoxValue,
                        
               }); 
        }
        render(){
                return(
                        <div className="message-send-wrapper input-group -flex justify-content-center">
                                <div className="message-input-box-wrapper">
                                <input className="input-box form-control" type="text" value={this.state.currentMessageBoxValue} onChange={this.messageBoxOnChange}/>
                                </div>

                                <div className="send-button-wrapper input-group-btn">
                                <button className="send-button btn btn-primary" onClick={this.handleButtonClick}>
                                        Send           
                                </button>
                                </div>
                        </div>

                );

        }

}

export default MessageSend;
