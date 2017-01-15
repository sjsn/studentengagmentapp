import React from 'react';

import LoginForm from './LoginForm';
import $ from 'jquery';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }

    componentWillMount() {
        document.body.style.backgroundImage = '';
    }

    handleEmailChange(newEmail) {
        this.setState({
            email: newEmail
        });
    }

    handlePassChange(newPass) {
        this.setState({
            password: newPass
        });
    }

    handleSubmit() {
        var data = {
            email: this.state.email,
            password: this.state.password
        };
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then((res) => {
            console.log(res);
            console.log("logged in!");
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode) {
                console.log(errorCode);
                console.log(errorMessage);
            }
        });
    }

    render() {
        return (
            <div>
                <div className="user-form">
                    <LoginForm
                        onSubmit={this.handleSubmit.bind(this)}
                        onEmailChange={this.handleEmailChange.bind(this)}
                        onPassChange={this.handlePassChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
