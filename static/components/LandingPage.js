import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.body.style.backgroundImage = 'url(\'/static/background.jpg\')';
    }

    render() {
        return (
            <div className="landing-page">
                <div className="container landing-top">
                    <h1 className="main-title">Welcome to [Insert App Name Here]!</h1>
                    <p className="desc">
                        [Insert App Name Here] uses your webcam to track student attentiveness and provides a
                        clicker interface to keep students engaged. Using the webcam, we analyze if the students
                        is actively paying attention. If we find that they are not, we send them gentle reminders
                        to tune back in. If enough students are inattentive, we let the teacher know in order so
                        they can regroup the class and keeps their students engaged.
                    </p>
                    <div className="container login-btns">
                        <Link to="/students"><button className="btn btn-default">Login</button></Link>
                    </div>
                </div>
                <div className="landing-footer">
                    <p>Developed by Team Awesome!</p>
                </div>
            </div>
        );
    };
}
