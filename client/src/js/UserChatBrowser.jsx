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
                console.log("switching to chat with chat id: " + chatId);
                this.props.newChatSelected(this.props.chats[chatId]);
                this.setState({chatSelected: this.props.chats[chatId]});
                
        }
        render(){
                return(
                        <div className="user-chat-browser-wrapper col-2">
                                <ul className="list-group user-chat-browser-list">
                                        <li className="list-group-item user-chat-search-wrapper">
                                                {/*<input type="text" className=" user-chat-search-input" placeholder="Search for a chat"></input>*/}
                                                <button className="add-new-chat-button btn btn-primary w-100 p-3" onClick={this.props.addNewChatButton}>New Chat</button> 
                                        </li>
                                        {
                                                Object.keys(this.props.chats).map( key =>{
                                                        let chat = this.props.chats[key];
                                                        return(
                                                                <li onClick={ () => this.handleListItemClicked(chat.id)} key={chat.id} className={"list-group-item user-chat-browser-list-item" + (
                                                                        (this.state.chatSelected != null) ? (this.state.chatSelected.id == chat.id ? " active" : "") : ""
                                                                )}  >{chat.name} </li>

                                                        );
                                                })
                                        }
                                </ul>
                        </div>

                );

        }

}

export default UserChatBrowser;
