import React, {Component} from "react";
import {Redirect} from "react-router-dom";


const username = "shahanneda"; //TEMP
class Login extends Component {

        constructor(props){
                super(props);
                this.state =  {
                        usernameField:"",
                        loginComplete:false,//maybe have this set from a prop inorder to validate the login from above
                }
        }

        formSubmit = (event) =>{
                event.preventDefault();
                this.props.usernameSet(this.state.usernameField.toLowerCase() ); 
                this.setState({loginComplete:true});

        }
        usernameOnChange = (event) =>{

                this.setState({usernameField: event.target.value});
        }
        render(){

                if (this.state.loginComplete === true) {
                        return <Redirect to='/chat' />
                }
                return(
                        <div className="login-wrapper">
                                <div className="card d-flex justify-content-center align-items-center">


                                        <div className="card-body">
                                                <div className="card-title login-title  font-weight-bold font-italic">
                                                        NedaChat
                                                </div>
                                                <div className="card-text login-form-wrapper">
                                                        <form onSubmit={this.formSubmit}>
                                                                <div className="form-group">
                                                                        {/*<label htmlFor="username">username</label>*/}
                                                                        <input id="username" type="text" className="username-input-field form-control" name="username" placeholder="username" value={this.state.usernameField} onChange={this.usernameOnChange}></input>
                                                                </div>
                                                                <div className="login-submit-button-wrapper">
                                                                        <button type="submit" name="submit" className="btn btn-primary login-username-button"> Login </button>
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                )
        }
}

export default Login;
