import React, { Component } from 'react';
import './Signup.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Board from '../Boards/Board';
import {Redirect} from 'react-router-dom';

class Signup extends Component {

    state = {
        username: "",
        password: "",
        signup: false,
    }

    usernameChangeHandler = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmitHandler = () => {

        if (this.state.password !== "" && this.state.username !== "") {
            NotificationManager.success('Login Success');
            this.setState({
                signup: true,
            })
            this.props.handleSignIn();
        }
        else {
            NotificationManager.error('No username or password', 'Click me!', 3000);
        }
        let obj = {
            password: this.state.password,
            boards: {},

        }
        if (!localStorage.getItem(this.state.username)) {
            localStorage.setItem(this.state.username, JSON.stringify(obj))
        }
        localStorage.setItem("signedInUser", this.state.username)
    }


    render() {
        if(this.state.signup)
        {
            return(
                <Redirect to="/boards"></Redirect>
            )
        }
        return (
            <div>
                <NotificationContainer />
                {this.state.signup ?
                    <Board name={this.state.username} />
                    :
                    <div className="SignUp">
                        <div>
                            <label>USERNAME : </label>
                            <input className="Input"
                                type="text"
                                value={this.state.username}
                                onChange={this.usernameChangeHandler} />
                        </div>
                        <div>
                            <label>PASSWORD : </label>
                            <input className="Input"
                                type="password"
                                value={this.state.password}
                                onChange={this.passwordChangeHandler} />
                        </div>
                        <div>
                            <button className="SignupButton" onClick={this.onSubmitHandler}>SIGNUP</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Signup;