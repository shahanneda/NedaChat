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
                        username:"Shahan Neda",
                        messageBody: this.state.currentMessageBoxValue,
                        
               }); 
        }
        render(){
                return(
                        <div>
                                <input type="text" value={this.state.currentMessageBoxValue} onChange={this.messageBoxOnChange}/>

                                <button onClick={this.handleButtonClick}>
                                        Send           
                                </button>
                        </div>

                );

        }

}

export default MessageSend;
