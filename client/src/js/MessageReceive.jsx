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
                fetch(this.props.serverIp + "/getChats/"+ this.props.username)
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

                //$('.individual-chat-wrapper').toggle('slide-left');
                this.setState({currentChat:chat, mobileIsOnChatMenu: true});        
                this.props.newChatSelected(chat);
        }
        menuButtonClicked = () => {
                let chatMenuOn = !this.state.mobileIsOnChatMenu;
                this.setState({mobileIsOnChatMenu: !this.state.mobileIsOnChatMenu});        
                /*
                if(chatMenuOn){
                        $('.user-chat-browser-wrapper').hide('slide', {direction: 'up'}, 100);
                        $('.individual-chat-wrapper').show('slide', {direction: 'up'}, 100);
                }else{
                        $('.user-chat-browser-wrapper').show('slide', {direction: 'up'}, 100);
                        $('.individual-chat-wrapper').hide('slide', {direction: 'up'}, 100);
                }*/
        }
        render(){
                if(this.props.socket == null){
                        return(<Redirect to="/"/ >);
                }
                if(this.state.currentChat == null){
                        return(
                                <div>
                                        <UserChatBrowser serverIp={this.props.serverIp} addNewChatButton={this.props.addNewChatButton} chats={this.state.chats} newChatSelected={this.newChatSelected} mobileIsOnChatMenu={this.state.mobileIsOnChatMenu} noChats={true}/>
                                        <div className="no-chats"></div>
                                </div>
                        );
                }
                return(
                        <div className="row p-4">
                                <div className="sideMenuButton btn"  onClick={this.menuButtonClicked}> {this.state.mobileIsOnChatMenu ? "Menu" : "Back to Chat"} </div>

                                <UserChatBrowser serverIp={this.props.serverIp} addNewChatButton={this.props.addNewChatButton} chats={this.state.chats} newChatSelected={this.newChatSelected} mobileIsOnChatMenu={this.state.mobileIsOnChatMenu} noChats={false}/>

                                <IndividualChat key= {this.state.currentChat.id} chat={this.state.currentChat } username={this.props.username} mobileIsOnChatMenu={this.state.mobileIsOnChatMenu}/>

                        </div>

                );

        }

}

export default MessageReceive;
