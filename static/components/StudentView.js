import React from 'react';
import { browserHistory } from 'react-router';

import secrets from './secrets';

export default class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: "", "uid": this.props.params.uid};
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
			canvas.width = vid.clientWidth;
			canvas.height = vid.clientHeight;
			brush.drawImage(vid, 0, 0);
            canvas.toBlob((blob) => {
                var image = new Image();
                image.src = blob;
                var storeImg = firebase.storage().ref().child('images/' + this.state.uid)
                .put(blob)
                .then(() => {
    			    // Then gets the URL of that new image
    			    return firebase.storage().ref().child("images/" + this.state.uid).getDownloadURL();
    			})
                .then((url) => {
    				console.log(url);
                });
            });
		}, 5000);
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
