import React from 'react';

export default class CreateClassForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNameChange(name) {
        this.props.onNameChange(name.target.value);
    }

    handleStudentIdsChange(studentId) {
        studentId = studentId.target.value;
        studentId = studentId.split(',');
        this.props.onStudentIdsChange(studentId);
    }

    handleSubmit(form) {
        form.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div>
                <form className="user-form" onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" placeholder="Class name" id="name" name="name" onChange={this.handleNameChange.bind(this)} />
                    <br />
                    <label htmlFor="studentIds">Student Ids (Comma separated): </label>
                    <input type="text" placeholder="1,2,etc." id="studentIds" name="studentIds" onChange={this.handleStudentIdsChange.bind(this)} />
                    <br />
                    <button type="submit" className="btn btn-primary">Create Class</button>
                </form>
            </div>
        );
    }
}
