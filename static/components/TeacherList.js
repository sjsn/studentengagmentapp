import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class TeacherList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params);
        this.state = {uid: this.props.params.uid,
            teacher: firebase.database().ref().child('user/' + this.props.params.uid).once('value')
                    .then((result) => {
                        var teacherInfo = result.val();
                        return this.setState({teacher: teacherInfo});
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode) {
                            console.log(errorCode);
                            console.log(errorMessage);
                        }
                    }),
                    classList: <p>Loading...</p>
            };
    }

    componentDidMount() {
        firebase.database().ref().child('class').once('value')
        .then((result) => {
            var classes = Object.keys(result.val()).map((key, index) => {
                var curClass = result.val()[key];
                if (curClass.teacherId === this.state.uid) {
                    return (
                        <div>
                            <Link to={'/teachers/' + this.state.uid + '/' + key}><h1>{curClass.name}</h1></Link>
                            <p>{curClass.studentIds}</p>
                        </div>
                    );
                }
            });
            return classes;
        })
        .then((result) => {
            this.setState({classList: result})
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleCreateClass() {
        browserHistory.push('/teachers/' + this.state.uid + '/create');
    }

    handleJoinClass() {
        browserHistory.push('/teachers/' + this.state.uid + '/' + this.state.classId);
    }

    render() {
        return (
            <div>
                <h1>Hello, {this.state.teacher.fName}!</h1>
                <button className="btn btn-default" onClick={this.handleCreateClass.bind(this)}>Create Class</button>
                <button className="btn btn-primary" onClick={this.handleJoinClass.bind(this)}>Join Class</button>
                <div>
                    {this.state.classList}
                </div>
            </div>
        );
    }
}
