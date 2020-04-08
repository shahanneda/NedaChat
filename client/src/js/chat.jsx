import React, {Component} from "react";

import io from 'socket.io-client/dist/socket.io';

import MessageSend from "./MessageSend.jsx"

class Chat extends Component {
         
        constructor(){
                super();
                let socket = io.connect('http://localhost:80');

                this.state =  {
                        socket:socket,
                }
                socket.on("connect", function (data){
                        //console.log("Connected!");
                        socket.emit("NewConnection", {
                                user:{
                                        name:"Shahan",
                                }
                        });
                });

                socket.on("buttonClicked", function (data){
                        console.log("button clicked!");
                });
                this.handleButtonClick = this.handleButtonClick.bind(this);
                console.log("chat init");
        }
        
        handleButtonClick(){
                console.log("sent message");
               this.state.socket.emit("buttonClicked", {}); 
        }

        render(){
                return(
                        <div>
                                Chat Component
                                {/* <MessageReceive socket={this.state.socket} />  */}

                                <MessageSend socket={this.state.socket} />

                                <button onClick={this.handleButtonClick}>
                                        button           
                                </button>
                        </div>

                )
        }
}

export default Chat;
