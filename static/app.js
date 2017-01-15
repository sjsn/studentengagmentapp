import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link } from 'react-router';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import CreateUserPage from './components/CreateUserPage';
import StudentPage from './components/StudentPage';
import StudentList from './components/StudentList';
import StudentView from './components/StudentView';
import TeacherPage from './components/TeacherPage';
import TeacherList from './components/TeacherList';
import TeacherView from './components/TeacherView';
import CreateClassPage from './components/CreateClassPage';
import NoMatch from './components/NoMatch';
import auth from './components/auth';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logout: <button className="btn btn-danger" onClick={this.logout.bind(this)}>Log Out</button>};
        // if (auth.isLoggedIn()) {
        //     this.state = {logout: <button className="btn btn-danger" onClick={this.logout.bind(this)}>Log Out</button>};
        // } else {
        //     this.state = {logout: ""};
        // }
    }

    logout() {
        firebase.auth().signOut()
        .then(() => {
            console.log("successfully signed out");
            browserHistory.push('/');
        })
        .catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                {this.state.logout}
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
            <Route path="students" component={StudentPage} onEnter={requireAuth}>
                <Route path=":uid" component={StudentList}/>
                <Route path=":uid/:classId" component={StudentView}/>
            </Route>
            <Route path="teachers" component={TeacherPage} onEnter={requireAuth}>
                <Route path=":uid/create" component={CreateClassPage}/>
                <Route path=":uid" component={TeacherList}/>
                <Route path=":uid/:classId" component={TeacherView}/>
            </Route>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('content'));
