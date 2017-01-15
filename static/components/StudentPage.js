import React from 'react';

import secrets from './secrets';

export default class StudentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: ""};
    }

    componentWillMount() {
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
        // Retake picture every 1 minute & send to backend
        setInterval(() => {
			canvas.width = video.clientWidth;
			canvas.height = video.clientHeight;
			brush.drawImage(video, 0, 0);
			var drawMask = document.getElementById('mask');
			brush.drawImage(drawMask, 75, 25);
		}, 60*10000);
    }

    render() {
        return (
            <div>
                {/* <div className="hidden"> */}
                    <video></video>
                    <canvas></canvas>
                {/* </div> */}
            </div>
        );
    }
}
