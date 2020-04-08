import React, {Component} from "react";
import Message from "./Message.jsx"
class ChatGroup extends Component{

        constructor(props){
                super(props)
                
                this.state = {
                };
        }
        
        render(){
                return(
                        <div>
                                <h1> {this.props.chat.name} </h1>
                                {
                                        Object.keys(this.props.chat.messages).map(  key => {
                                                let message = this.props.chat.messages[key]
                                                return <Message key={message.id} author={message.fromUserName} body={message.messageBody} />;
                                        })
                                }
                        </div>
                );

        }

}

export default ChatGroup;
