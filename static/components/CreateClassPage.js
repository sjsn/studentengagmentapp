import React from 'react';
import { browserHistory } from 'react-router';

import CreateClassForm from './CreateClassForm';

export default class CreateClassPage extends React.Component {
    constructor(props) {
        super(props);
        document.body.style.backgroundImage = '';
        var teacherId = this.props.params.uid;
        this.state = {name: "", studentIds: [], teacher: teacherId};
    }

    handleNameChange(value) {
        this.setState({name: value});
    }

    handleStudentIds(value) {
        this.setState({studentIds: value})
    }

    handleSubmit() {
        var data = {
            name: this.state.name,
            studentIds: this.state.studentIds,
            teacherId: this.state.teacherId
        }
        firebase.database().ref().child('class/')
        .push(data)
        .then((newClass) => {
            console.log(newClass);
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
