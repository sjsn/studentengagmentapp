import React from 'react';
import { Link } from 'react-router';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEmailChange(newEmail) {
        this.props.onEmailChange(newEmail.target.value);
    }

    handlePassChange(newPass) {
        this.props.onPassChange(newPass.target.value);
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
                        <label htmlFor="email">Email: </label>
                        <input type="email" placeholder="email" id="email" name="email" onChange={this.handleEmailChange.bind(this)} />
                        <br />
                        <label htmlFor="password">Password: </label>
                        <input type="password" placeholder="password" id="password" name="password" onChange={this.handlePassChange.bind(this)} />
                        <br />
                        <button type="submit" className="btn btn-primary">Login</button>
                        <Link to="/newuser"><button className="btn btn-primary">Create an Account</button></Link>
                    </div>
                </form>
            </div>
        );
    }
}
