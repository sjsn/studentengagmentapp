import React from 'react';
import { browserHistory } from 'react-router';

import LoginForm from './LoginForm';
import $ from 'jquery';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
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
        .then(() => {
            return firebase.auth().currentUser.uid;
        })
        .then((uid) => {
            this.setState({uid: uid});
            return firebase.database().ref().child('user/' + uid).once('value');
        })
        .then((result) => {
            var teacher = result.val().teacher;
            var role = teacher ? 'teachers' : 'students';
            browserHistory.push('/' + role + '/' + this.state.uid);
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
