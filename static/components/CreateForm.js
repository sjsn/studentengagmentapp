import React from 'react';
import { Link } from 'react-router';

export default class CreateForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEmailChange(newEmail) {
        this.props.onEmailChange(newEmail);
    }

    handlePassChange(newPass) {
        this.props.onPassChange(newPass);
    }

    handleRoleChange(newRole) {
        this.props.onRoleChange(newRole);
    }

    handleFNameChange(newFName) {
        this.props.onFNameChange(newFName);
    }

    handleLNameChange(newLName) {
        this.props.onLNameChange(newLName);
    }

    handleSubmit(form) {
        // Disables submit functionality
        form.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div>
                <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="role">Role: </label><br />
                        <select name="role" id="role" onChange={this.handleRoleChange.bind(this)}>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        <br />
                        <label htmlFor="fname">First Name: </label><br />
                        <input type="text" placeholder="e.g. Sam" id="fname" name="fname" onChange={this.handleFNameChange.bind(this)} />
                        <br />
                        <label htmlFor="lname">Last Name: </label><br />
                        <input type="text" placeholder="e.g. Nicolas" id="lname" name="lname" onChange={this.handleLNameChange.bind(this)} />
                        <br />
                        <label htmlFor="email">Email: </label><br />
                        <input type="email" placeholder="email" id="email" name="email" onChange={this.handleEmailChange.bind(this)} />
                        <br />
                        <label htmlFor="password">Password: </label><br />
                        <input type="password" placeholder="password" id="password" name="password" onChange={this.handlePassChange.bind(this)} />
                        <br />
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <p><Link to="/login">Already have an account?</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}
