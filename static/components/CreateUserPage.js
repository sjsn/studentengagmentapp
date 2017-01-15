import React from 'react';

import CreateForm from './CreateForm';

export default class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", role: "student", fName: "", lName: ""};
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

    handleFNameChange(newFName) {
        this.setState({
            fName: newFName
        });
    }

    handleLNameChange(newLName) {
        this.setState({
            lName: newLName
        });
    }

    handleRoleChange(newRole) {
        this.setState({
            role: newRole
        });
    }

    handleSubmit() {
        var data = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            fName: this.state.fName,
            lName: this.state.lName
        };
        console.log(data);
    }

    render() {
        // Implement DocuSign and shit
        return (
            <div>
                <div className="user-form">
                    <CreateForm
                        onSubmit={this.handleSubmit.bind(this)}
                        onEmailChange={this.handleEmailChange.bind(this)}
                        onPassChange={this.handlePassChange.bind(this)}
                        onFNameChange={this.handleFNameChange.bind(this)}
                        onLNameChange={this.handleLNameChange.bind(this)}
                        onRoleChange={this.handleRoleChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
