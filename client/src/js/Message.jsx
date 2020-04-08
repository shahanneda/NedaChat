import React, {Component} from "react";

import io from 'socket.io-client/dist/socket.io';

import MessageSend from "./MessageSend.jsx"
import MessageReceive from "./MessageReceive.jsx"

const username = "shahanneda"; //TEMP
class Message extends Component {
         
        constructor(props){
                super(props);
                this.state =  {
                }
        }
        

        render(){
                return(
                        <div className="message-wrapper">
                                <div className="message-sender">
                                        {this.props.author}
                                </div>
                                <div className="message-body">
                                        {this.props.body}
                                </div>

                        </div>

                )
        }
}

export default Message;
