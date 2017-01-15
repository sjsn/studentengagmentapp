import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link } from 'react-router';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import CreateUserPage from './components/CreateUserPage';
import StudentPage from './components/StudentPage';
import TeacherPage from './components/TeacherPage';
import NoMatch from './components/NoMatch';
import auth from './components/auth';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    logout() {
        firebase.auth().signOut()
        .then(() => {
            console.log("successfully signed out");
        })
        .catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    render() {
        var logout = auth.isLoggedIn() ? <button className="btn btn-danger" onClick={this.logout.bind(this)}>Log Out</button> : "";
        return (
            <div>
                {logout}
                {this.props.children}
            </div>
        );
    }
}

function requireAuth(nextState, replace) {
    if (!auth.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LandingPage}/>
            <Route path="login" component={LoginPage}/>
            <Route path="newuser" component={CreateUserPage}/>
            <Route path="students" component={StudentPage} onEnter={requireAuth}/>
            <Route path="teachers" component={TeacherPage} onEnter={requireAuth}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('content'));
