import React from 'react';
import { browserHistory } from 'react-router';

export default class TeacherPage extends React.Component {
    constructor(props) {
        super(props);
        document.body.style.backgroundImage = '';
        this.state = {uid: this.params.uid};
        firebase.database().ref().child('user/' + this.state.uid).once('value')
        .then((result) => {
            var teacherInfo = result.val();
            this.setState({teacher: teacherInfo});
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

    handleCreateClass() {
        browserHistory.push('/' + this.state.uid + '/create');
    }

    handleJoinClass() {
        browserHistory.push('/' + this.state.uid + '/');
    }

    render() {
        return (
            <div>
                <button className="btn btn-default" onClick={this.handleCreateClass.bind(this)}>Create Class</button>
                <button className="btn btn-primary" onClick={this.handleJoinClass.bind(this)}>Join Class</button>
                <h1>Hello, {this.state.teacher.fName}!</h1>
                {this.props.children}
            </div>
        );
    }
}
