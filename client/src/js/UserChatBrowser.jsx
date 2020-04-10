import React, {Component} from "react";

class UserChatBrowser extends Component{
        constructor(props){
                super(props)

                this.state = {
                        chatSelected:"",
                };

        }

        componentDidMount(){
        }

        componentDidUpdate(newprops){
                if(newprops.chats != this.props.chats){
                        let chat = this.props.chats[Object.keys(this.props.chats)[0]];
                        this.props.newChatSelected(chat); //todo make this select one from a saved cookie
                        this.setState({chatSelected: chat});
                }
        }

        handleListItemClicked = (chatId) =>{
                console.log("chat id" + chatId);
                
        }
        render(){
                return(
                        <div className="user-chat-browser-wrapper col-2">
                                <ul className="list-group user-chat-browser-list">
                                        {
                                                Object.keys(this.props.chats).map( key =>{
                                                        let chat = this.props.chats[key];
                                                        return(
                                                                <li onClick={ () => this.handleListItemClicked(chat.id)} key={chat.id} className={"list-group-item user-chat-browser-list-item" + (this.state.chatSelected.id == chat.id ? " active" : "" )}  >{chat.name} </li>

                                                        );
                                                })
                                        }
                                </ul>
                        </div>

                );

        }

}

export default UserChatBrowser;
