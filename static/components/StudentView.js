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
        // Retake picture every 1 minute & send to backend
        setInterval(() => {
			canvas.width = vid.clientWidth;
			canvas.height = vid.clientHeight;
			brush.drawImage(vid, 0, 0);
            canvas.toBlob((blob) => {
                const fileName = 'images/' + this.state.classId + this.state.uid;
                var storeImg = firebase.storage().ref().child(fileName)
                .put(blob)
                .then(() => {
    			    // Then gets the URL of that new image
    			    return firebase.storage().ref().child(fileName).getDownloadURL();
    			})
                .then((url) => {
    				$.ajax({
                        'url': '/api/analyze',
                        'method': 'POST',
                        'data': {
                            'img_url': url
                        }
                    })
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((err) => {
                        console.log(err.error);
                    })
                });
            });
		}, 6*1000);
    }

    render() {
        return (
            <div>
                <video></video>
                <canvas></canvas>
            </div>
        );
    }
}
