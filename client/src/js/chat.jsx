import React, {Component} from "react";

import io from 'socket.io-client/dist/socket.io';


class Chat extends Component {

        init(){
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
