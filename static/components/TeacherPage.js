import React from 'react';
import { browserHistory } from 'react-router';

export default class TeacherPage extends React.Component {

    componentWillMount() {
        document.body.style.backgroundImage = '';
    }

    render() {
        return <h1>Hello, teacher!</h1>;
    }
}
