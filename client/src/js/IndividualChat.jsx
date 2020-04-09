import React, {Component} from "react";
import Message from "./Message.jsx"
class IndividualChat extends Component{

        constructor(props){
                super(props)

                this.state = {
                };
        }

        render(){
                return(
                        <div className="card row">
                                <div className="card-body">
                                        <h1 className="display-3 text-primary chatTitle"> {this.props.chat.name} </h1>
                                        <div className="list-group chatBody">
                                                {
                                                        Object.keys(this.props.chat.messages).map(  key => {
                                                                let message = this.props.chat.messages[key]
                                                                return <Message key={message.id} author={message.fromUserName} body={message.messageBody} />;
                                                        })
                                                }
                                        </div>
                                </div>
                        </div>
                );

        }

}

export default IndividualChat;
