// set up for audio input
try {
	navigator.getUserMedia = navigator.webkitGetUserMedia
	navigator.webkitGetUserMedia({audio: true, video: false}, connectStream, microphoneError);
}
catch(e) {
	alert("Sorry, your browser doesn't support the magic of getUserMedia \n try the latest firefox or chrome");
}

// if the mic is accesible
function connectStream(stream)
{
	source = context.createMediaStreamSource(stream);
	initialize()
	// anim()
}

// if the mic is in accessible
function microphoneError(e) {
	alert('MicrophoneError error!', e);
};

// Create an <audio> element.
var audio = new Audio();
	
// // Pick any one of these songs
audio.src = 'music/Tobu - Roots [NCS Release].mp3'
audio.autoplay = true;
audio.playbackRate = 1;

// // Our <audio> element will be the audio source.
source = context.createMediaElementSource(audio);

