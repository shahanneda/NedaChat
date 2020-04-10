import React, {Component} from "react";

import IndividualChat from "./IndividualChat.jsx";
import UserChatBrowser from "./UserChatBrowser.jsx";

import {Redirect} from "react-router-dom"
class MessageReceive extends Component{
        constructor(props){
                super(props)

                this.state = {
                        chats:{},
                        currentChat:null,
                };
                if(this.props.socket === null){
                        return;
                }




                /*this.props.socket.on("allChatUpdate", (data) =>{
                        let newChats = data;
                        console.log( newChats);
                        this.setState( { chats: newChats } ) ;
                });*/

                this.props.socket.on("disconnect", data=>{
                        console.log("DISCONNECTED!!");        
                });

                this.props.socket.on("chatUpdate", data => { // use the => fuction so that we can uset he state inside, this is because the this is getting binded
                        let chat = data;
                        let localChats = this.state.chats;
                        localChats[chat.id] = chat;

                        let currentChatUpdated = localChats[this.state.currentChat.id];

                        this.setState( { chats: localChats, currentChat: currentChatUpdated } );
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

        newChatSelected = (chat) => {
                this.setState({currentChat:chat});        
                this.props.newChatSelected(chat);
        }
        render(){
                if(this.props.socket == null){
                        return(<Redirect to="/"/ >);
                }
                if(this.state.currentChat == null){
                        return(
                                <div>
                                        <UserChatBrowser chats={this.state.chats} newChatSelected={this.newChatSelected}/>
                                        "No Chats!"
                                </div>
                        );
                }
                return(
                        <div className="row p-4">
                                <UserChatBrowser addNewChatButton={this.props.addNewChatButton} chats={this.state.chats} newChatSelected={this.newChatSelected}/>

                                <IndividualChat key= {this.state.currentChat.id} chat={this.state.currentChat } />

                        </div>

                );

        }

}

export default MessageReceive;
