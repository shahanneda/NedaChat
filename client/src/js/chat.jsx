import React, {Component} from "react";

import io from 'socket.io-client/dist/socket.io';

import MessageSend from "./MessageSend.jsx"
import MessageReceive from "./MessageReceive.jsx"

const username = "shahanneda"; //TEMP
class Chat extends Component {
         
        constructor(props){
                super(props);
                let socket = io.connect('http://localhost:80');

                this.state =  {
                        socket:socket,
                }
                socket.on("connect", function (data){
                        console.log("Connected!");
                        socket.emit("NewConnection", {
                                user:{
                                        name:username,
                                }
                        });
                });

                socket.on("buttonClicked", function (data){
                        console.log("button clicked!");
                });
                console.log("chat init");
        }
        

        render(){
                return(
                        <div>
                                Chat Component
                                 <MessageReceive socket={this.state.socket} username={this.props.username} /> 

                                <MessageSend socket={this.state.socket} username={this.props.username}  />

                        </div>

                )
        }
}

export default Chat;
