

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
      button.style.backgroundColor = 'lightgreen'; // Change button color
      break;
    }
  }
}
