
let imageHolder
let canvasCounter=0
var counter = 1;
var slider = document.getElementById('slider');
var sliderReplacement = 0 
let cards = ["card0.jpg","card1.jpg","card2.jpg","card3.jpg","card4.jpg","card5.jpg","card6.jpg","card13.jpg","card13.jpg","card13.jpg","card13.jpg",
"card13.jpg"]

let sampleEle = document.querySelector(".container");
document.body.addEventListener("mousemove", (event) => {
   //sampleEle.innerHTML = "X axis: " + event.x + " Y axis: " + event.y;
 //  console.log("X axis: " + event.x + " Y axis: " + event.y + " count: "+counter);
  //  document.getElementById("slider").value = event.x
   sliderReplacement = event.x
  // imageHolder.kaleidoscopeAngle(event.x);
  //  slider.onauxclick = function () {
    //sliderMover()
   
    //  console.log("RIGHTHERE")
  //  slider.imageHolder.kaleidoscopeAngle(event.x);
  // };
   //document.getElementById("slider").
  
   
   //function buildStage(images) 
    // var stage = new Konva.Stage({
    //   container: 'container',
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // });
  
    // var layer = new Konva.Layer();
  
    // var imageHolder = new Konva.Image({
    // //   image: images.bugs,
    // //   width: 800,
    // //   Height: 800,
    // //   x: 80,
    // //   y: 30,
    // //   draggable: true,
    // // });
  
    // imageHolder.cache();
    // imageHolder.filters([Konva.Filters.Kaleidoscope]);
    // var kRange = document.getElementById('myRange')
    // imageHolder.kaleidoscopePower(kRange.value);
    // layer.add(imageHolder);
    // stage.add(layer);
    // var slider = document.getElementById('slider');
    //  slider.oninput = function () {
    //   //sliderMover()
     
    //     console.log("RIGHTHERE")
     // imageHolder.kaleidoscopeAngle(event.x);
   // };
  // console.log("RIGHTHERE")
   // imageHolder.kaleidoscopeAngle(slider.value);
   opacity = (sliderReplacement *.01)/17
//    console.log('opacity = '+ opacity)
   document.getElementById("quote").style.opacity = opacity
    imageHolder.kaleidoscopeAngle(sliderReplacement);
  
});

slider.oninput = function () {
 // function jumpSLider(){
    //sliderMover()
   
      console.log("RIGHTHERE")
    // imageHolder.kaleidoscopeAngle(slider.value);
     imageHolder.kaleidoscopeAngle(sliderReplacement);
   

//}  
 jumpSLider()}

 preRepeatWhileMouseOver()
 {repeatWhileMouseOver(document.getElementById('container'), .000001);}



function repeatWhileMouseOver(element, time) {
  var interval = null;

 element.addEventListener('mouseover', function() {
      //interval = setInterval(action, time);
      interval = setInterval(time);
  });

  element.addEventListener('mouseout', function() {
      clearInterval(interval);
  });
 

 
}

console.log(imageHolder)
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
// calculate the max value of the browser here and push those values below for the x and y variables

  var layer = new Konva.Layer();

   imageHolder = new Konva.Image({
    image: images.bugs,
    width: 800,
    Height: 800,
    x: 50,
    y: 30,
    draggable: true,
  });

  imageHolder.cache();
  imageHolder.filters([Konva.Filters.Kaleidoscope]);
  var kRange = document.getElementById('myRange')
  imageHolder.kaleidoscopePower(kRange.value);
  layer.add(imageHolder);
  stage.add(layer);
  //var slider = document.getElementById('slider');
  //  slider.onchange = function () {
  //  function jumpSLider(){
    //sliderMover()
   
      console.log("RIGHTHERE")
    // imageHolder.kaleidoscopeAngle(slider.value);
     imageHolder.kaleidoscopeAngle(sliderReplacement);
//  };
}

//load the image with the drop-down menu 
function myFunction() {
  var x = document.getElementById("selectImage").value;
  console.log("X = "+x)
  document.getElementById("theImage").value = x
  //document.getElementById("card").src=x+"images/cards/";
  let cardNumber = document.getElementById("selectImage").selectedIndex;
//   console.log('card = '+ cards[cardNumber])
let currentCard = "images/"+cards[cardNumber]
  console.log('card = '+ cards[cardNumber])
  document.getElementById("card").src = currentCard
  imageHolder = x
  let sources2 = {
    //bugs: '/images/bugs.jpeg',
     bugs: imageHolder
  };
  loadImages(sources2, buildStage)
}

function changeOverlay() {
  var x = document.getElementById("selectOverlay").value;
  console.log("X = "+x)
  // document.getElementById("theImage").value = x
  document.getElementById("pngOverlay1").src= x;
  console.log('X = images/'+x)
}

//load the image when button is pressed 
function loadTheImage(){
    console.log('in here!!!')
 imageHolder = document.getElementById("theImage").value
 let sources2 = {
  //bugs: '/images/bugs.jpeg',
   bugs: imageHolder
};
loadImages(sources2, buildStage)
}

//initial image load 
var sources = {
    //bugs: '/images/bugs.jpeg',
     bugs: imageHolder
  };

loadImages(sources, buildStage);

// Make the DIV element draggable:
dragElement(document.getElementById("controlPanel"));

function hideShow(){
  console.log('in the hide/show function')
  const container = document.getElementById('container');
  const controlPanel = document.getElementById("controlPanel")
  container.addEventListener('click', function handleClick() {
    if (controlPanel.style.display === 'none') {
      controlPanel.style.display = 'block';
    } else {
     controlPanel.style.display = 'none';
  
     // btn.textContent = 'Show div';
    }
  });
  //const btn = document.getElementById('btn');
}
function hideLogo(){
  if  (document.getElementById("pngOverlay").style.zIndex ==="-1"){
// console.log("I'm Here!")

       document.getElementById("pngOverlay").style.zIndex = "12"
  }else{
    document.getElementById("pngOverlay").style.zIndex = "-1";

  }
  // document.getElementById("pngOverlay").style.zIndex = "-1";
 // document.getElementById('pngOverlay').style.zIndex =.
 console.log("zIndex= "+ document.getElementById("pngOverlay").style.zIndex )
}

function doCapture(){
//this is where the capture functionality should go
console.log('in here')
console.log('learning how onkeydown works')
window.scrollTo(0,0)

  html2canvas (document.getElementById("container"),{
      // scale:10,
      backgroundColor: null,
  }).then(function (canvas) {
    var canvasProxy = canvas
    canvasProxy.style.opacity = "30%";
    canvasProxy.style.rotate = "200%";
    // transform: rotate(1045deg);
  // console.log (canvas.toDataURL ("image/jpeg", 0.1));
  // const box = document.createElement("div");
  // box.id = "new_element";
  // box.innerHTML = canvas.toDataURL("image/jpeg", 0.1)
  var el_up = document.getElementById('container');

// el_up.innerHTML += canvas;
// el_up.innerHTML += canvas;

 document.getElementById("container").appendChild(canvasProxy)
 //document.getElementById("container").appendChild(canvas)
 //globalCompositeOperation = 'source-in'
// var overlay = document.createElement("div"); 
// overlay.style.position = "absolute";
// overlay.style.top = "60";
// overlay.style.left = "60";
// overlay.style.height = "100%";
// overlay.style.width = "100%";
// overlay.style.opacity = "0.9";
// overlay.style.zIndex = "30";
// overlay.style.backgroundSize = "cover";
// overlay.style.backgroundImage =  "image_one.jpeg";
// document.getElementById("container").appendChild(overlay)
//***
//document.body.appendChild(canvas)
  ///above
  // let box = document.createElement(div)
  // box.id = "new_element"
  // document.getElementById("box").appendChild(canvas);
  // document.getElementById
//   var ajax = new XMLHttpRequest () ;
// ajax.open ("POST","save-capture. php", true);
// ajax.$end ("image=" + canvas.toDataURL ("image/jpeg", 0.9));
// let xholder = 
   });



}

function doCapture1(){
  //this is where the capture functionality should go
  console.log('in here')
  console.log('learning how onkeydown works')
  window.scrollTo(0,0)
  
    html2canvas (document.getElementById("container"),{
        // scale:10,
        backgroundColor: null,
    }).then(function (canvas) {
      var canvasProxy = canvas
      canvasProxy.style.opacity = "30%";
      // canvasProxy.style.rotate = "200%";
      // transform: rotate(1045deg);
    // console.log (canvas.toDataURL ("image/jpeg", 0.1));
    // const box = document.createElement("div");
    // box.id = "new_element";
    // box.innerHTML = canvas.toDataURL("image/jpeg", 0.1)
    var el_up = document.getElementById('container');
  
  // el_up.innerHTML += canvas;
  // el_up.innerHTML += canvas;
  
   document.getElementById("container").appendChild(canvasProxy)
   //document.getElementById("container").appendChild(canvas)
   //globalCompositeOperation = 'source-in'
  // var overlay = document.createElement("div"); 
  // overlay.style.position = "absolute";
  // overlay.style.top = "60";
  // overlay.style.left = "60";
  // overlay.style.height = "100%";
  // overlay.style.width = "100%";
  // overlay.style.opacity = "0.9";
  // overlay.style.zIndex = "30";
  // overlay.style.backgroundSize = "cover";
  // overlay.style.backgroundImage =  "image_one.jpeg";
  // document.getElementById("container").appendChild(overlay)
  //***
  //document.body.appendChild(canvas)
    ///above
    // let box = document.createElement(div)
    // box.id = "new_element"
    // document.getElementById("box").appendChild(canvas);
    // document.getElementById
  //   var ajax = new XMLHttpRequest () ;
  // ajax.open ("POST","save-capture. php", true);
  // ajax.$end ("image=" + canvas.toDataURL ("image/jpeg", 0.9));
  // let xholder = 
     });
  
  
  
  }

  $(document).ready(function() {
    $("#lower_left").draggable();
  });
