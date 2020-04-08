import React, {Component} from "react";

class MessageReceive extends Component{
        constructor(props){
                super(props)
                
                this.props.socket.on("newMessage", function(data){
                               console.log(data); 
                });
                this.messageBoxOnChange = this.messageBoxOnChange.bind(this);

                this.state = {
                };
        }
        
        messageBoxOnChange(event){
        }
        render(){
                return(
                        <div>
                        </div>

                );

        }

}

export default MessageReceive;
