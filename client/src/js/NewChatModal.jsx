import React, {Component} from "react";
import Message from "./Message.jsx"
class NewChatModal extends Component{

        constructor(props){
                super(props)

                this.state = {
                };
        }

        render(){
                return(
                        <div className="card col-10">
                                New Chat Modal
                        </div>
                );

        }
        componentDidMount() {
        }

        componentDidUpdate() {
        }

}

export default NewChatModal;
