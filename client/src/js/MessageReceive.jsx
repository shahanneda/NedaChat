import React, {Component} from "react";

import IndividualChat from "./IndividualChat.jsx";

import {Redirect} from "react-router-dom"
class MessageReceive extends Component{
        constructor(props){
                super(props)
        
                this.state = {
                        chats:{},
                };
                if(this.props.socket === null){
                        return;
                }
                



                this.props.socket.on("allChatUpdate", (data) =>{
                        let newChats = data;
                        console.log( newChats);
                        this.setState( { chats: newChats } ) ;
                });
                this.props.socket.on("disconnect", data=>{
                        console.log("DISCONNECTED!!");        
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
                fetch("http://192.168.1.22/getChats/"+ this.props.username)
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
                if(this.props.socket == null){
                        return(<Redirect to="/"/ >);
                }
                return(
                        <div>
                                {
                                        Object.keys(this.state.chats).map( key =>
                                                <IndividualChat key= {key} chat={this.state.chats[key] } />
                                        )

                                }
                        </div>

                );

        }

}

export default MessageReceive;
