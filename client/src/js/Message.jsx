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
                        <div className={ "message-wrapper list-group-item " + (this.props.isSelfMessage ? "message-wrapper-author" : "")} style={{backgroundColor:  stringToRGB(this.props.author) }  }> 
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


function stringToRGB(s){
        const hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0) // this converts the username to a hashCode
        const hash = hashCode(s);

        let r = (hash & 0xFF0000) >> 16;
        let g = (hash & 0x00FF00) >> 8;
        let b = hash & 0x0000FF;

        console.log(hash);
        return "rgb(" + r/2 + "," + g + "," + b + ", 0.2)" 
}
