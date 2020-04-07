import React, {Component} from "react";

import io from 'socket.io-client/dist/socket.io';


class Chat extends Component {

        constructor(){
                super();
                var socket = io.connect('http://localhost:80');
                socket.on("connect", function (data){
                        console.log("Connected!");

                        socket.emit("NewConnection", {
                                user:{
                                        name:"Shahan",
                                }
                        });
                });
                
                console.log("chat init");

        }
        
        render(){
                return(
                        <div>
                                Chat Component
                        </div>

                )
        
        }

}

export default Chat;
