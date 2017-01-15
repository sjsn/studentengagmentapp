import React from 'react';
import { browserHistory } from 'react-router';

import $ from 'jquery';
import secrets from './secrets';

export default class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: "", uid: this.props.params.uid, classId: this.props.params.classId};
        document.body.style.backgroundImage = '';
    }

    componentDidMount() {
        var canvas = document.querySelector('canvas');
        var brush = canvas.getContext('2d');
        var vid;
        // Picture Taker
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
        navigator.getMedia(
            {video: true, audio: false},
            (mediaStream) => {
                vid = document.querySelector('video');
                vid.src = window.URL.createObjectURL(mediaStream);
                vid.play();
            },
            (err) => {
                console.log(err);
            }
        );
        var url = "fake";
        var count = 0;
        setInterval(() => {
            $.ajax({
                'url': '/api/analyze',
                'method': 'POST',
                'data': {
                    'img_url': url
                }
            })
            .then((result) => {
                count++;
                console.log(count);
                if (count == 5) {
                    this.setState({hasQuestion: true, engagement: true});
                    result = true;
                    count = 0;
                } else {
                    this.setState({engagement: false});
                }
            })
            .catch((err) => {
                console.log(err.error);
            });
        }, 2.5 * 1000, count);

        // // Retake picture every 1 minute & send to backend
        // setInterval(() => {
		// 	canvas.width = vid.clientWidth;
		// 	canvas.height = vid.clientHeight;
		// 	brush.drawImage(vid, 0, 0);
        //     canvas.toBlob((blob) => {
        //         const fileName = 'images/' + this.state.classId + this.state.uid;
        //         var storeImg = firebase.storage().ref().child(fileName)
        //         .put(blob)
        //         .then(() => {
    	// 		    // Then gets the URL of that new image
    	// 		    return firebase.storage().ref().child(fileName).getDownloadURL();
    	// 		})
        //         .then((url) => {
    	// 			$.ajax({
        //                 'url': '/api/analyze',
        //                 'method': 'POST',
        //                 'data': {
        //                     'img_url': url
        //                 }
        //             })
        //             .then((result) => {
        //                 console.log(result);
        //             })
        //             .catch((err) => {
        //                 console.log(err.error);
        //             })
        //         });
        //     });
		// }, 6*1000);
    }

    handleSubmit(form) {
        form.preventDefault();
        console.log(this.state.attentionResp);
        this.setState({engager: "", engagement: false, hasQuestion: false});
    }

    handleChange(val) {
        this.setState({attentionResp: val});
    }

    handleBtnChange(val) {
        this.setState({answer: val});
    }

    render() {
        if (this.state.engagement || this.state.hasQuestion) {
            return (
                <div>
                    <div className="user-page-container">
                        <div className="hidden">
                            <video></video>
                            <canvas></canvas>
                        </div>
                        <div className="engager">
                            <h1>Lecture Checkin!</h1>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <label htmlFor="attention"></label>
                                <select id="attention" name="attention" onChange={this.handleChange.bind(this)}>
                                    <option value="1">I understand!</option>
                                    <option value="2">I'm a little confused.</option>
                                    <option value="3">I'm totally lost.</option>
                                    <option value="4">My mind is on other things today.</option>
                                </select>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="clicker">
                            <p>{this.state.answer || "N/A"}</p>
                            <table>
                                <tr><td><button onClick={this.handleBtnChange.bind(this)} value="a">a</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="b">b</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="c">c</button></td></tr>
                                <tr><td><button onClick={this.handleBtnChange.bind(this)} value="d">d</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="e">e</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="f">f</button></td></tr>
                                <tr>
                                    <td><button onClick={this.handleBtnChange.bind(this)} value="g">g</button></td>
                                    <td><button onClick={this.handleBtnChange.bind(this)} value="h">h</button></td>
                                    <td><button onClick={this.handleBtnChange.bind(this)} value="i">i</button></td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="user-page-container">
                        <div className="hidden">
                            <video></video>
                            <canvas></canvas>
                        </div>
                        <div className="clicker">
                            <p>{this.state.answer || "N/A"}</p>
                            <table>
                                <tr><td><button onClick={this.handleBtnChange.bind(this)} value="a">a</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="b">b</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="c">c</button></td></tr>
                                <tr><td><button onClick={this.handleBtnChange.bind(this)} value="d">d</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="e">e</button></td>
                                <td><button onClick={this.handleBtnChange.bind(this)} value="f">f</button></td></tr>
                                <tr>
                                    <td><button onClick={this.handleBtnChange.bind(this)} value="g">g</button></td>
                                    <td><button onClick={this.handleBtnChange.bind(this)} value="h">h</button></td>
                                    <td><button onClick={this.handleBtnChange.bind(this)} value="i">i</button></td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
