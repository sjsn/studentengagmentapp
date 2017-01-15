import React from 'react';
import { browserHistory } from 'react-router';

export default class TeacherPage extends React.Component {
    constructor(props) {
        super(props);
        document.body.style.backgroundImage = '';
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
                    })
        };
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
