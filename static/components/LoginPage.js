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
        })
    }

    handleSubmit() {
        console.log(this.state.email);
        console.log(this.state.password);
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
