import React from 'react';
import { browserHistory } from 'react-router';

export default class TeacherPage extends React.Component {
    constructor(props) {
        super(props);
        document.body.style.backgroundImage = '';
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
