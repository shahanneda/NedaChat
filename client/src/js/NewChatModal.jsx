import React, {Component} from "react";

import Autosuggest from 'react-autosuggest';

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
        <div>
                {suggestion}
        </div>
);
class NewChatModal extends Component{

        constructor(props){
                super(props)

                this.state = {
                        usersToAddInChat:"",
                        chatName:"Chat",
                        chatNameEdited:false,
                        suggestions:[],
                        valueOfAddPersonField: "",
                        usersAlreadyInChat:[this.props.selfUserId]



                };

        }

        componentDidMount() {
                $(this.modal).modal('show');
                $(this.modal).on('hidden.bs.modal', this.props.close);
        }

        componentDidUpdate(){

        }

        getSuggestionValue = (suggestion) => {
                return suggestion;
        }

        addNewUserToChat = (userid) => {
                let usersAlreadyInChat = this.state.usersAlreadyInChat;

                if(usersAlreadyInChat.indexOf(userid) == -1){ // check if user is already in chat
                        usersAlreadyInChat.push(userid); 

                        let chatName = "";
                        //let chatNameEndString = ""; //for group chats

                        if(usersAlreadyInChat.length == 2){
                                chatName =  userid + " and " + this.props.selfUserId +"'s chat" ;
                        }
                        else if (usersAlreadyInChat.length !=1){

                        /*        if (usersAlreadyInChat.length ==4){
                                        chatNameEndString = usersAlreadyInChat[2] + ", " + usersAlreadyInChat[3]; 
                                }else{
                                        chatNameEndString = usersAlreadyInChat[2] + ", " + usersAlreadyInChat[3] + " and others"; 
                                }*/
                                chatName = "Group Chat " ;
                        }

                        this.setState({usersAlreadyInChat: usersAlreadyInChat, valueOfAddPersonField: "", chatName:(!this.state.chatNameEdited ? chatName : this.state.chatName)});
                }else{
                        $("div[userid=" + userid  + "]").fadeOut(500).fadeIn(500);
                        
                }

                this.setState({valueOfAddPersonField: ""});

        }


        handleUsersToAddInChat = (event) =>{
                this.setState({usersToAddInChat: event.target.value});
        }

        handleChatName = (event) =>{
                this.setState({chatName: event.target.value, chatNameEdited:true});
        }


        onAddPersonFieldChange = (event, { newValue }) => {
                this.setState({
                        valueOfAddPersonField: newValue
                });
        };

        // Autosuggest will call this function every time you need to update suggestions.
        // You already implemented this logic above, so just use it.
        onSuggestionsFetchRequested = ({ value }) => {

                fetch(this.props.serverIp + "/searchForUser/"+ value)
                        .then(res => res.json())
                        .then(
                                (result) => {
                                        let newSuggestions = [];
                                        for(let user of Object.keys(result)){
                                                newSuggestions.push(result[user]); 
                                        }
                                        this.setState({
                                                suggestions: newSuggestions
                                        });
                                },
                                // Note: it's important to handle errors here
                                (error) => {
                                        console.log("Error in gettin chats");
                                }
                        )

        };

        onSuggestionSelected = (event, {suggestion}) => {
                this.addNewUserToChat(suggestion);
        }

        onSuggestionsClearRequested = () => {
                this.setState({
                        suggestions: []
                });
        };

        removeUserAdded = (userid) => {
                if(this.props.selfUserId == userid){
                        return;
                }
                let usersAlreadyInChat = this.state.usersAlreadyInChat;
                usersAlreadyInChat.splice(usersAlreadyInChat.indexOf(userid), 1);
                this.setState({usersAlreadyInChat:usersAlreadyInChat});
        }

        handleUserInputOnKeyDown = (event) => {
                if(event.key === "Enter"){
                        if(this.state.suggestions.indexOf(this.state.valueOfAddPersonField) != -1){// check if the username typed is indeed a valid username
                                this.addNewUserToChat(this.state.valueOfAddPersonField);
                        }
                        this.setState({valueOfAddPersonField: ""});
                }
        }
        createChatButtonClicked = () => {
                let usersInChatObject ={};
                this.state.usersAlreadyInChat.map( (userid) =>{
                        usersInChatObject[userid] = userid;
                });
                
                console.log(usersInChatObject);
                this.props.socket.emit("createChat", {
                        id: Date.now() + this.state.chatName,
                        name: this.state.chatName,
                        usersInChat:usersInChatObject,
                });
                this.props.close();
                $(this.modal).modal("hide");
        }
        render(){
                const { valueOfAddPersonField, suggestions } = this.state;
                let value = valueOfAddPersonField;
                const inputProps = {
                        placeholder: 'Type a username to add to this chat',
                        value,
                        onChange: this.onAddPersonFieldChange,
                        onKeyDown: this.handleUserInputOnKeyDown

                };
                return(
                        <div className="modal " tabIndex="1" role="dialog" ref={modal=> this.modal = modal}>

                                <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                                <div className="modal-header">
                                                        <h5 className="modal-title">New Chat</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span>&times;</span>
                                                        </button>
                                                </div>

                                                <div className="modal-body">
                                                        <form>
                                                                <div className="form-group" autoComplete="off">
                                                                        <label htmlFor="users-in-chat" className="col-form-label"> Users to add in chat: </label> 
                                                                        {/* <input type="text" value={this.state.usersToAddInChat} onChange={this.handleUsersToAddInChat} className="form-control" id="users-in-chat" />*/}
                                                                        <Autosuggest
                                                                                suggestions={this.state.suggestions}
                                                                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                                                getSuggestionValue={this.getSuggestionValue}
                                                                                renderSuggestion={renderSuggestion}
                                                                                inputProps={inputProps} 
                                                                                onKeyDown={this.handleUserInputOnKeyDown}
                                                                                onSuggestionSelected={this.onSuggestionSelected}

                                                                        />

                                                                </div>

                                                                <div className="usersAddedToChat">
                                                                        { 
                                                                                this.state.usersAlreadyInChat.map( (userid) => {

                                                                                        return(<div className="user-chip" userid={userid} key={userid}>
                                                                                                {userid}
                                                                                                {this.props.selfUserId == userid ? "":<span onClick={() => this.removeUserAdded(userid)} className="user-chip-close-btn">&times;</span>}
                                                                                        </div>);
                                                                                })

                                                                        }
                                                                </div>


                                                                <div className="form-group">
                                                                        <label htmlFor="chat-name" className="col-form-label">Chat name</label> 
                                                                        <input type="text" className="form-control" value={this.state.chatName} onChange={this.handleChatName} id="chat-name" />
                                                                </div>

                                                        </form>
                                                        <div className="modal-footer">
                                                                <button type="button" onClick={this.createChatButtonClicked} className="btn btn-primary">Create Chat</button>
                                                        </div>
                                                </div>                                                
                                        </div>
                                </div>

                        </div>
                );

        }


}

export default NewChatModal;
