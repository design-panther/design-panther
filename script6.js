// Variables for recording
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

// Function to start/stop recording
async function startRecording() {
    const recordButton = document.getElementById('recordAudio');
  
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('MediaDevices API or getUserMedia is not supported in your browser.');
      console.error('MediaDevices API or getUserMedia is not supported in your browser.');
      return;
    }
  
    if (isRecording) {
      mediaRecorder.stop();
      isRecording = false;
      recordButton.textContent = 'Record Audio';
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = function (event) {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
            console.log('Data available:', event.data);
          }
        };
  
        mediaRecorder.onstop = function () {
          const blob = new Blob(recordedChunks, { type: 'audio/webm' });
          recordedChunks = [];
          const url = URL.createObjectURL(blob);
          console.log('Recording stopped. Blob URL:', url);
          attachAudioToButton(url);
        };
  
        mediaRecorder.onerror = function (event) {
          console.error('Error during recording:', event.error);
        };
  
        mediaRecorder.start();
        isRecording = true;
        recordButton.textContent = 'Stop Recording';
        console.log('Recording started');
      } catch (err) {
        console.error('Error accessing the microphone:', err);
      }
    }
  }
  

// Function to attach audio to the next available button
function attachAudioToButton(audioUrl) {
  const buttons = document.querySelectorAll('#lower_middle .glow-on-hover');
  for (let button of buttons) {
    if (!button.hasAttribute('data-audio-attached')) {
      button.setAttribute('data-audio-attached', 'true');
      button.onclick = function () {
        const audio = new Audio(audioUrl);
        audio.play();
      };
      button.style.backgroundColor = 'lightgreen';
      break;
    }
  }
}

// Functionality for buttons in lower_left
const urls = [
  'images/kicker2.wav', 'images/kicker13.wav', 'images/New_weird.wav', 
  'images/glow.wav', 'images/owl.wav', 'images/cat.m4a', 
  'images/ambient_jams.m4a', 'images/dub_coffee.m4a','images/shortwave.wav',
  'images/spooky.wav','images/kicker.wav','images/glitch.wav','images/ragtime.wav'
];

function playAudio(url) {
  const audioElement = new Audio(url);
  audioElement.play();
}

document.getElementById('bt').addEventListener('click', function() {
  playAudio(urls[0]);
});
document.getElementById('bt1').addEventListener('click', function() {
  playAudio(urls[1]);
});
document.getElementById('bt2').addEventListener('click', function() {
  playAudio(urls[2]);
});
document.getElementById('bt3').addEventListener('click', function() {
  playAudio(urls[3]);
});
document.getElementById('bt4').addEventListener('click', function() {
  playAudio(urls[4]);
});
document.getElementById('bt5').addEventListener('click', function() {
  playAudio(urls[5]);
});
document.getElementById('bt6').addEventListener('click', function() {
  playAudio(urls[6]);
});
document.getElementById('bt7').addEventListener('click', function() {
  playAudio(urls[7]);
});
document.getElementById('bt8').addEventListener('click', function() {
  playAudio(urls[8]);
});
document.getElementById('bt13').addEventListener('click', function() {
  playAudio(urls[9]);
});
document.getElementById('bt14').addEventListener('click', function() {
  playAudio(urls[10]);
});
document.getElementById('bt15').addEventListener('click', function() {
  playAudio(urls[11]);
});
document.getElementById('bt16').addEventListener('click', function() {
  playAudio(urls[12]);
});


// Existing functionality for Konva and other elements
let imageHolder;
let canvasCounter = 0;
var counter = 1;
var slider = document.getElementById('slider');
var sliderReplacement = 0;
let cards = [
  "card0.jpg", "card1.jpg", "card2.jpg", "card3.jpg",
  "card4.jpg", "card5.jpg", "card6.jpg", "card13.jpg",
  "card13.jpg", "card13.jpg", "card13.jpg", "card13.jpg"
];

let programButtons = [4];

// Listen for custom hand pose event
document.addEventListener('fingerPositionDetected', (event) => {
  const xPosition = event.detail.x;
  sliderReplacement = xPosition;  // Update the x position based on hand detection
  updateImageHolder(xPosition);  // Update the kaleidoscope effect
});

function updateImageHolder(xPosition) {
  if (imageHolder && imageHolder.kaleidoscopeAngle) {
    imageHolder.kaleidoscopeAngle(xPosition);
    document.getElementById("quote").style.opacity = (xPosition * 0.01) / 17;
  }
}

function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

function buildStage(images) {
  var stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
  });

  var layer = new Konva.Layer();

  imageHolder = new Konva.Image({
    image: images.bugs,
    width: 800,
    height: 800,
    x: 50,
    y: 30,
    draggable: true,
  });

  imageHolder.cache();
  imageHolder.filters([Konva.Filters.Kaleidoscope]);
  var kRange = document.getElementById('myRange');
  imageHolder.kaleidoscopePower(kRange.value);
  layer.add(imageHolder);
  stage.add(layer);
}

function myFunction() {
  var x = document.getElementById("selectImage").value;
  document.getElementById("theImage").value = x;
  let cardNumber = document.getElementById("selectImage").selectedIndex;
  let currentCard = "images/" + cards[cardNumber];
  document.getElementById("card").src = currentCard;
  imageHolder = x;
  let sources2 = {
    bugs: imageHolder
  };
  loadImages(sources2, buildStage);
}

function changeOverlay() {
  var x = document.getElementById("selectOverlay").value;
  document.getElementById("pngOverlay1").src = x;
}

function loadTheImage() {
  imageHolder = document.getElementById("theImage").value;
  let sources2 = {
    bugs: imageHolder
  };
  loadImages(sources2, buildStage);
}

loadImages({ bugs: imageHolder }, buildStage);

function hideShow() {
  const container = document.getElementById('container');
  const controlPanel = document.getElementById("controlPanel");
  container.addEventListener('click', function handleClick() {
    controlPanel.style.display = controlPanel.style.display === 'none' ? 'block' : 'none';
  });
}

function hideLogo() {
  if (document.getElementById("pngOverlay").style.zIndex === "-1") {
    document.getElementById("pngOverlay").style.zIndex = "12";
    document.getElementById("fileForm").style.zIndex = "100";
  } else {
    document.getElementById("pngOverlay").style.zIndex = "-1";
    document.getElementById("fileForm").style.zIndex = "-1";
  }
}

function doCapture() {
  html2canvas(document.getElementById("container"), {
    backgroundColor: null,
  }).then(function (canvas) {
    canvas.style.opacity = "30%";
    canvas.style.transform = "rotate(200deg)";
    document.getElementById("container").appendChild(canvas);
  });
}

$(document).ready(function () {
  $("#lower_left").draggable();
});

// Setup camera and handpose model for gesture recognition
async function setupCamera() {
  const video = document.createElement('video');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  // document.body.appendChild(video);
  video.play();
  return video;
}

async function loadModel() {
  return await handpose.load();
}

async function detectHandPose(video, model) {
  async function frameLandmarks() {
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const indexFingerTip = predictions[0].landmarks[8]; // Index finger tip
      document.dispatchEvent(new CustomEvent('fingerPositionDetected', { detail: { x: indexFingerTip[0] } }));
    }
    requestAnimationFrame(frameLandmarks);
  }
  frameLandmarks();
}

async function main() {
  const video = await setupCamera();
  const model = await loadModel();
  detectHandPose(video, model);
}

main();

document.addEventListener('fingerPositionDetected', (event) => {
  const xPosition = event.detail.x;
  // Use xPosition to control elements
  // Example: Update a slider or apply effects to a Konva image
  if (window.imageHolder && window.imageHolder.kaleidoscopeAngle) {
    window.imageHolder.kaleidoscopeAngle(xPosition);
  }
});
