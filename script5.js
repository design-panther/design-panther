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

let programButtons = [4]

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
    document.getElementById("pngOverlay1").src = x;  //here is the value for pngOverlay1
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

function hideLogo(){
    if  (document.getElementById("pngOverlay").style.zIndex ==="-1"){
   console.log("I'm Here!")
  
         document.getElementById("pngOverlay").style.zIndex = "12"
         document.getElementById("fileForm").style.zIndex = "100";
    }else{
      document.getElementById("pngOverlay").style.zIndex = "-1";
      document.getElementById("fileForm").style.zIndex = "-1";
  
    }
    // document.getElementById("pngOverlay").style.zIndex = "-1";
   // document.getElementById('pngOverlay').style.zIndex =.
   console.log("zIndex= "+ document.getElementById("pngOverlay").style.zIndex )
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

$(document).ready(function() {
    $("#lower_left").draggable();
});

// let mediaRecorder;
// let recordedChunks = [];

// async function startRecording() {
//   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//     alert('MediaDevices API or getUserMedia is not supported in your browser.');
//     return;
//   }

//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(stream);

//     mediaRecorder.ondataavailable = function (event) {
//       if (event.data.size > 0) {
//         recordedChunks.push(event.data);
//       }
//     };

//     mediaRecorder.onstop = function () {
//       const blob = new Blob(recordedChunks, { type: 'audio/webm' });
//       recordedChunks = [];
//       const url = URL.createObjectURL(blob);
//       attachAudioToButton(url);
//     };

//     mediaRecorder.start();
//     setTimeout(() => {
//       mediaRecorder.stop();
//     }, 5000); // Record for 5 seconds

//   } catch (err) {
//     console.error('Error accessing the microphone: ', err);
//   }
// }

// function attachAudioToButton(audioUrl) {
//   const buttons = document.querySelectorAll('#lower_middle .glow-on-hover');
//   const button = buttons[Math.floor(Math.random() * buttons.length)]; // Attach to a random button
//   button.onclick = function () {
//     const audio = new Audio(audioUrl);
//     audio.play();
//   };
// }


let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

async function startRecording() {
  const recordButton = document.getElementById('recordAudio');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('MediaDevices API or getUserMedia is not supported in your browser.');
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
        }
      };

      mediaRecorder.onstop = function () {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        recordedChunks = [];
        const url = URL.createObjectURL(blob);
        attachAudioToButton(url);
      };

      mediaRecorder.start();
      isRecording = true;
      recordButton.textContent = 'Stop Recording';
    } catch (err) {
      console.error('Error accessing the microphone: ', err);
    }
  }
}

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
