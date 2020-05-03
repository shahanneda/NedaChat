import React, {Component} from "react";

import io from 'socket.io-client/dist/socket.io';

import MessageSend from "./MessageSend.jsx"
import MessageReceive from "./MessageReceive.jsx"
import Login from "./Login.jsx";
import NewChatModal from "./NewChatModal.jsx";
import EditChatModal from "./EditChatModal.jsx";
import {
        HashRouter as Router,
        Switch,
        Route,
        Link,
        Redirect,
        useLocation,
        withRouter,

} from "react-router-dom";

class Chat extends Component {

        constructor(props){
                super(props);
                this.state =  {
                        socket:null,
                        username:'undefinedUser',
                        currentChat: null,
                        newChatModalOn:false,
                        editChatModalOn: false,
                        currentEditingChat: null,
                        serverIp:"http://216.71.213.85:7777",

                }


        }

        tryToConnectToSocket = () => {
                let socket = io.connect(this.state.serverIp);
                socket.on("connect", data =>{
                        console.log("Connected!");
                        socket.emit("NewConnection", {
                                user:{
                                        id:this.state.username,
                                        username:this.state.username
                                }
                        });
                });

                socket.on("buttonClicked", function (data){
                        console.log("button clicked!");
                });
                this.setState({socket:socket});
                console.log("chat init");
        }

        usernameSet = (newname) => {
                this.setState({username:newname});
                this.tryToConnectToSocket();
        }

        newChatSelected = (chat) => {
                this.setState({currentChat:chat});        
        }

        addNewChatButton = () => {
                this.setState({newChatModalOn: true}); 
        }

        closeNewChatModal = () => {
                this.setState({newChatModalOn: false}); 
        }
        
        editChatButtonPressed = (chat) => {
                this.setState({editChatModalOn: true, currentEditingChat: chat});
        }
        closeEditChatModal = () =>{
                this.setState({editChatModalOn: false}) 
        }

        render(){

                return(
                        <Router>
                                <div className="container-fluid">
                                        <Switch>

                                                <Route path="/chat">
                                                        <MessageReceive serverIp={this.state.serverIp} editChatButtonPressed={this.editChatButtonPressed} newChatSelected={this.newChatSelected} socket={this.state.socket} username={this.state.username} addNewChatButton={this.addNewChatButton}/> 
                                                        <MessageSend currentChat={this.state.currentChat} socket={this.state.socket} username={this.state.username}  />
                                                        {this.state.newChatModalOn ? <NewChatModal serverIp={this.state.serverIp} selfUserId={this.state.username} socket={this.state.socket} close={this.closeNewChatModal} /> : ""}
                                                        {this.state.editChatModalOn ? <EditChatModal chat={this.state.currentEditingChat} serverIp={this.state.serverIp} selfUserId={this.state.username} socket={this.state.socket} close={this.closeEditChatModal} /> : ""}
                                                </Route>

                                                <Route path="/">
                                                        <Login usernameSet={this.usernameSet} />
                                                </Route>
                                        </Switch>

                                </div>
                        </Router>

                )
        }
}

export default Chat;
