import React, {Component} from "react";

class ChatGroup extends Component{

        constructor(props){
                super(props)
                
                this.state = {
                };
        }
        
        render(){
                return(
                        <div>
                                <h1> {this.props.chat.name} </h1>
                                {
                                        Object.keys(this.props.chat.messages).map(  key => {
                                        return this.props.chat.messages[key].messageBody;
                                })
                                }
                        </div>
                );

        }

}

export default ChatGroup;
