import React from 'react';
import { browserHistory } from 'react-router';

import CreateClassForm from './CreateClassForm';

export default class CreateClassPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("Create Class!");
        document.body.style.backgroundImage = '';
        var teacherId = this.props.params.uid;
        this.state = {name: "", studentIds: [], teacherId: teacherId};
    }

    handleNameChange(value) {
        this.setState({name: value});
    }

    handleStudentIdsChange(value) {
        this.setState({studentIds: value})
    }

    handleSubmit() {
        var data = {
            name: this.state.name,
            studentIds: this.state.studentIds,
            teacherId: this.state.teacherId
        }
        var newRef = firebase.database().ref().child('class/').push(data)
        .then((snapshot) => {
            var classId = snapshot.key;
            browserHistory.push('/teachers/' + this.state.teacherId + '/' + classId);
        });
    }

    render() {
        return (
            <div>
                <CreateClassForm
                    onNameChange={this.handleNameChange.bind(this)}
                    onStudentIdsChange={this.handleStudentIdsChange.bind(this)}
                    onSubmit={this.handleSubmit.bind(this)}
                />
            </div>
        );
    }
}
