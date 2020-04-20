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
                let date = new Date();
                date.setTime(this.props.time);
                return(
                        <div className={ "message-wrapper list-group-item " + (this.props.isSelfMessage ? "message-wrapper-author" : "")}> 
                                <div className="message-header">
                                        <div className="message-time">
                                                {date.getHours() % 12 }:{date.getMinutes() < 10 ? date.getMinutes() + "0": date.getMinutes()} {date.getHours()/12 >= 1 ? "PM" : "AM"}
                                        </div>

                                        <div className="message-sender">
                                                {this.props.author}
                                        </div>
                                </div>
                                <div className="message-body">
                                        {this.props.body}
                                </div>

                        </div>

                )
        }
}

export default Message;
