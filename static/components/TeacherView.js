import React from 'react';
import { browserHistory } from 'react-router';

export default class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {display: null};
    }

    componentDidMount() {
        firebase.database().ref().child('class/' + this.props.params.classId).once('value')
                .then((result) => {
                    var classInfo = result.val();
                    this.setState({
                        display: (
                            <div>
                                <h1>{classInfo.name}</h1>
                                <p>{classInfo.studentIds}</p>
                            </div>
                        )
                    });
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
        if (this.state.display != null) {
            console.log(this.state.display);
            return (
                <div>
                    {this.state.display}
                </div>
            );
        } else {
            return (
                <div>
                    {<p>Loading</p>}
                </div>
            );
        }
    }
}
