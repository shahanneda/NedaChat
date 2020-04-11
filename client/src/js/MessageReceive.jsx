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
                        mobileIsOnChatMenu: false,
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
                        if(this.state.currentChat != null){
                                let currentChatUpdated = localChats[this.state.currentChat.id];
                                this.setState({ currentChat:currentChatUpdated});
                        }

                        this.setState( { chats: localChats} );
                        console.log("Recieved chat update");
                });
                this.props.socket.on("addedToNewChat", data => {

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
        menuButtonClicked = () => {
                this.setState({mobileIsOnChatMenu: !this.state.mobileIsOnChatMenu});        
        }
        render(){
                if(this.props.socket == null){
                        return(<Redirect to="/"/ >);
                }
                if(this.state.currentChat == null){
                        return(
                                <div>
                                        <UserChatBrowser addNewChatButton={this.props.addNewChatButton} chats={this.state.chats} newChatSelected={this.newChatSelected} mobileIsOnChatMenu={this.state.mobileIsOnChatMenu}/>
                                        "No Chats!"
                                </div>
                        );
                }
                return(
                        <div className="row p-4">
                                <div className="sideMenuButton btn" style={{display:"fixed", right:0 +"px", top:0+"px", position:"absolute"}} onClick={this.menuButtonClicked}> Menu </div>

                                <UserChatBrowser addNewChatButton={this.props.addNewChatButton} chats={this.state.chats} newChatSelected={this.newChatSelected} mobileIsOnChatMenu={this.state.mobileIsOnChatMenu}/>

                                <IndividualChat key= {this.state.currentChat.id} chat={this.state.currentChat } username={this.props.username} mobileIsOnChatMenu={this.state.mobileIsOnChatMenu}/>

                        </div>

                );

        }

}

export default MessageReceive;
