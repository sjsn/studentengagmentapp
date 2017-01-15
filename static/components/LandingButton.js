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

    handleClick() {
        this.props.onClick(this.props.type);
    }

    render() {
        return (<button className="btn btn-default" onClick={this.handleClick.bind(this)}>{this.state.text}</button>);
    }
}
