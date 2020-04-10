import React, {Component} from "react";

class NewChatModal extends Component{

        constructor(props){
                super(props)

                this.state = {
                };

        }

        componentDidMount() {
                $(this.modal).modal('show');
                $(this.modal).on('hidden.bs.modal', this.props.close);
        }
        componentDidUpdate(){
        }

        render(){
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
                                                                <div className="form-group">
                                                                        <label htmlFor="users-in-chat" className="col-form-label"> Users to add in chat: </label> 
                                                                        <input type="text" className="form-control" id="users-in-chat" />
                                                                </div>

                                                                <div className="form-group">
                                                                        <label htmlFor="chat-name" className="col-form-label">Chat name</label> 
                                                                        <input type="text" className="form-control" id="chat-name" />
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
