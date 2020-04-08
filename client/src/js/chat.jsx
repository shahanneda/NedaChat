import React, {Component} from "react";

import io from 'socket.io-client/dist/socket.io';

import MessageSend from "./MessageSend.jsx"
import MessageReceive from "./MessageReceive.jsx"

class Chat extends Component {
         
        constructor(){
                super();
                let socket = io.connect('http://localhost:80');

                this.state =  {
                        socket:socket,
                }
                socket.on("connect", function (data){
                        console.log("Connected!");
                        socket.emit("NewConnection", {
                                user:{
                                        name:"Shahan",
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
                                 <MessageReceive socket={this.state.socket} /> 

                                <MessageSend socket={this.state.socket} />

                        </div>

                )
        }
}

export default Chat;
