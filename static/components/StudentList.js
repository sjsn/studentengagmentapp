import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {uid: this.props.params.uid,
            student: firebase.database().ref().child('user/' + this.props.params.uid).once('value')
                    .then((result) => {
                        var studentInfo = result.val();
                        return this.setState({student: studentInfo});
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
                if (curClass.studentIds.indexOf(this.state.uid) != -1) {
                    return (
                        <div>
                            <Link to={'/students/' + this.state.uid + '/' + key}><li>{curClass.name}</li></Link>
                        </div>
                    );
                }
            });
            return classes;
        })
        .then((result) => {
            this.setState({classList:
                (<div>
                    <h2>Your current classes:</h2>
                    <ul>
                        {result}
                    </ul>
                </div>)
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    handleJoinClass() {
        browserHistory.push('/teachers/' + this.state.uid + '/' + this.state.classId);
    }

    render() {
        return (
            <div>
                <h1>Hello, {this.state.student.fName}!</h1>
                <div>
                    {this.state.classList}
                </div>
            </div>
        );
    }

}
