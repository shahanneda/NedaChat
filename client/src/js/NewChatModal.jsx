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
                        chatName:"",
                        suggestions:[],
                        value: '',

                };

        }

        componentDidMount() {
                $(this.modal).modal('show');
                $(this.modal).on('hidden.bs.modal', this.props.close);
        }

        componentDidUpdate(){

        }

        getSuggestionValue = suggestion => suggestion;

        getSuggestions = value => {
                const inputValue = value.trim().toLowerCase();
                const inputLength = inputValue.length;

                return inputLength === 0 ? [] : languages.filter(lang =>
                        lang.name.toLowerCase().slice(0, inputLength) === inputValue
                );
        };
        handleUsersToAddInChat = (event) =>{
                this.setState({usersToAddInChat: event.target.value});
        }

        handleChatName = (event) =>{
                this.setState({chatName: event.target.value});
        }


        onChange = (event, { newValue }) => {
                this.setState({
                        value: newValue
                });
        };

        // Autosuggest will call this function every time you need to update suggestions.
        // You already implemented this logic above, so just use it.
        onSuggestionsFetchRequested = ({ value }) => {
                  
                fetch("http://192.168.1.22/searchForUser/"+ value)
                        .then(res => res.json())
                        .then(
                                (result) => {
                                        let newSuggestions = [];
                                        for(let user of Object.keys(result)){
                                                newSuggestions.push(result[user]); 
                                        }
                                        console.log(newSuggestions);
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

        // Autosuggest will call this function every time you need to clear suggestions.
        onSuggestionsClearRequested = () => {
                this.setState({
                        suggestions: []
                });
        };

        render(){
                const { value, suggestions } = this.state;
                // Autosuggest will pass through all these props to the input.
                const inputProps = {
                        placeholder: 'Type a programming language',
                        value,
                        onChange: this.onChange
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
                                                                        />

                                                                </div>

                                                                <div className="form-group">
                                                                        <label htmlFor="chat-name" className="col-form-label">Chat name</label> 
                                                                        <input type="text" className="form-control" value={this.state.chatName} onChange={this.handleChatName} id="chat-name" />
                                                                </div>

                                                        </form>
                                                        <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary">Create Chat</button>
                                                        </div>
                                                </div>                                                
                                        </div>
                                </div>

                        </div>
                );

        }


}

export default NewChatModal;
