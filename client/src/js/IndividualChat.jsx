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
                        <div className={"card col-sm-12 col-md-10 individual-chat-wrapper" + (this.props.mobileIsOnChatMenu ? "" : " mobile-hidden")}>
                                <div className="card-body">
                                        <h1 className="display-3 text-primary chat-title"> {this.props.chat.name} </h1>
                                        <div className="list-group chat-body">
                                                {
                                                       Object.keys(this.props.chat.messages).map(  key => {
                                                                let message = this.props.chat.messages[key]
                                                               console.log(this.props.username  + " " + message.fromUserName);
                                                               return <Message key={message.id} author={message.fromUserName} isSelfMessage={message.fromUserName ===   this.props.username} body={message.messageBody} />;
                                                        })
                                                }

                                                <div style={{ float:"left", clear: "both" }}
                                                        ref={(el) => { this.messagesEnd = el; }}>
                                                </div>
                                        </div>
                                </div>
                        </div>
                );

        }
        componentDidMount() {
                this.scrollToBottom();
        }

        componentDidUpdate() {
                this.scrollToBottom();
        }
        scrollToBottom = () => {
              //  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }

}

export default IndividualChat;
