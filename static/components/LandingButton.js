import React from 'react';

export default class LandingButton extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.type == "teacher") {
            this.state = {text: "Sign in as Teacher"};
        } else {
            this.state = {text: "Sign in as Student"};
        }
    }

    render() {
        return (<button className="btn btn-default">{this.state.text}</button>);
    }
}
