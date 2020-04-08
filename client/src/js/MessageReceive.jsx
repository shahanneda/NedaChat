import React, {Component} from "react";

class MessageReceive extends Component{
        constructor(props){
                super(props)

                this.state = {
                        chats:[],
                };

                

                this.props.socket.emit("getChats", data => {
                  this.state.chats = data;
                });



                this.props.socket.on("chatUpdate", data => { // use the => fuction so that we can uset he state inside, this is because the this is getting binded
                        let chat = data;
                        let localChats = this.state.chats;
                        localChats[chat.name] = chat;
                        this.setState( { chats: chat } );
                        console.log("Recieved chat update");
                });

                //this.props.socket.on("
                this.messageBoxOnChange = this.messageBoxOnChange.bind(this);

        }
        
        messageBoxOnChange(event){
        }
        render(){
                console.log(this.state.chats);
                return(
                        <div>


                        </div>

                );

        }

}

export default MessageReceive;
