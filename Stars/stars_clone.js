//take random points in the canvas and make it a white square,tilted.
//fade out on every tick
var canvasCreate;
var canvasPerlin;
var stage;
var inc = 0.01;
var opacityStep = 0.1;
var star = {
    shape: "",
    life: 0,
    dying:false
}
var maxFade = 500;
var maxStarSize = 6;
var maxChildren = 200;
var maxTwinkle = 300;

createjs.Ticker.interval = 25;
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
    // Actions carried out each tick (aka frame)
    if (!event.paused) {
        // Actions carried out when the Ticker is not paused.
        //fade in/out
        // destroyStars();


        stage.children.forEach(function(c) {
            if (c.state != "twinkle") {
                fade(c);
            }
            else {
                twinkle(c);
            }
        });
        createStars();
    }
    stage.update();
}


function createStars() {
    var numStars = Math.floor(Math.random() * 15);
    for (var i = 0; i < numStars; i++) {
        if (stage.numChildren > maxChildren) return;
        var rect = new createjs.Shape();
        // rect.graphics.moveTo();
        var size = Math.floor(Math.random() * maxStarSize);
        rect.graphics.beginFill("white").drawRect(0,0,size,size);
        rect.rotation = 45;
        rect.x = Math.floor(Math.random() * canvasCreate.width);
        rect.y = Math.floor(Math.random() * canvasCreate.height);
        rect.life = 2* Math.floor(Math.random() * maxFade); //always even
        rect.twinkle = Math.floor(Math.random() * maxTwinkle);
        rect.alpha = 0;
        rect.state = "growing";
        rect.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 50);
        // rect.addEventListener("tick", fade.bind(rect));
        stage.addChild(rect);
    }
    stage.update();
}

function destroyStars() {
    stage.children.forEach( s =>  {
        if (s.life != null ) {
            s.life -= 1;
            if (s.life < 1)
                stage.removeChild(s);
        }
    });
}

function fade(star) {
    if (!star.life) return;
    if (star.state == "dying" && star.alpha <= 0) {
        stage.removeChild(star);
        return;
    }
    var step = 1/(star.life/2);
    star.alpha += star.state == "dying" ? -step : step;
    if (star.alpha >= 1) star.state = "dying";
}

function twinkle(star) {

}

function setup() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvasCreate = document.getElementById("cjCanvas");
    canvasCreate.width = width;
    canvasCreate.height = height;
    stage = new createjs.Stage(canvasCreate);

    canvasCreate.style.left = "0px";
    canvasCreate.style.top = "0px";
    canvasCreate.style.position = "absolute";

    var rect = new createjs.Shape();
    rect.graphics.beginFill("black").drawRect(0,0,canvasCreate.width, canvasCreate.height);
    stage.globalCompositeOperation = "lighter";
    stage.addChild(rect);
    stage.update();

    canvasPerlin = document.getElementById("perlinCanvas");
    ctx = canvasPerlin.getContext('2d');
    canvasPerlin.width = width;
    canvasPerlin.height = height;

    canvasPerlin.style.left = "0px";
    canvasPerlin.style.top = "0px";
    canvasPerlin.style.position = "absolute";
    canvasPerlin.style.opacity = "0.2";
    image = ctx.createImageData(canvasPerlin.width, canvasPerlin.height);
    data = image.data;
}


var ctx;

var image;
var data;
var height = 0;

function drawFrame() {
  var start = Date.now();
  // Cache width and height values for the canvas.
  var cWidth = canvasPerlin.width;
  var cHeight = canvasPerlin.height;

  var max = -Infinity, min = Infinity;
  var noisefn = noise.perlin3;

  for (var x = 0; x < cWidth; x++) {
    for (var y = 0; y < cHeight; y++) {
      var value = noisefn(x / 150, y / 50, height);

      if (max < value) max = value;
      if (min > value) min = value;

      value = (1 + value) * 1.1 * 128;

      var cell = (x + y * cWidth) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      //data[cell] += Math.max(0, (25 - value) * 8);
      data[cell + 3] = 255; // alpha.
    }
  }

  var end = Date.now();

  ctx.fillColor = 'black';
  ctx.fillRect(0, 0, 100, 100);
  ctx.putImageData(image, 0, 0);

  height += 0.005;
  requestAnimationFrame(drawFrame);
}

  requestAnimationFrame(drawFrame);
// setTimeout(requestAnimationFrame, .00005, drawFrame);


