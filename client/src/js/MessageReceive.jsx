import React, {Component} from "react";

class MessageReceive extends Component{
        constructor(props){
                super(props)

                this.state = {
                        chats:{},
                };

                



                this.props.socket.on("allChatUpdate", (data) =>{
                        let newChats = data;
                        console.log( newChats);
                        this.setState( { chats: newChats } ) ;
                });

                this.props.socket.on("chatUpdate", data => { // use the => fuction so that we can uset he state inside, this is because the this is getting binded
                        let chat = data;
                        let localChats = this.state.chats;
                        localChats[chat.name] = chat;
                        this.setState( { chats: localChats } );
                        console.log("Recieved chat update");
                });

                //this.props.socket.on("
                this.messageBoxOnChange = this.messageBoxOnChange.bind(this);

        }
        
        componentDidMount(){
                fetch("http://localhost:80/getChats")
                        .then(res => res.json())
                        .then(
                                (result) => {
                                        this.setState({
                                                chats: result
                                        });
                                },
                                // Note: it's important to handle errors here
                                (error) => {
                                        console.log("Error in gettin chats");
                                }
                        )

        }
        messageBoxOnChange(event){
        }
        render(){
                console.log(this.state.chats);
                for(let chat in this.state.chats){
                        console.log("Caht  " + chat);
                }
                return(
                        <div>
                                

                        </div>

                );

        }

}

export default MessageReceive;
