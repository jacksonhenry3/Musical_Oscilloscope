// set up for audio playback
try {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
}
catch(e) {
  alert("Sorry, your browser doesn't support the magic of web audio \n try the latest firefox or chrome");
}

var left_analyser,right_analyser,left_buffer,right_buffer;
function initialize(freqBinNumber = Math.pow(2,15)) {

  splitter = context.createChannelSplitter(2);
  
  left_analyser = context.createAnalyser();
  left_analyser.fftSize = freqBinNumber
  right_analyser = context.createAnalyser();
  right_analyser.fftSize = freqBinNumber
  left_buffer = new Float32Array(left_analyser.fftSize)
  right_buffer = new Float32Array(right_analyser.fftSize)
  left_analyser.smoothingTimeConstant = 0;
  right_analyser.smoothingTimeConstant = 0;
  source.connect(splitter)

  // connect left channel to analyser
  splitter.connect(left_analyser, 0)

  // connect right channel to analyser
  splitter.connect(right_analyser, 1)

  source.connect(context.destination)

  anim()

}

