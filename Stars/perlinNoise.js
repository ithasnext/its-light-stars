var inc = 0.01;
var ctx;
var gradient = [];

function setup() {
    //setup canvas
    createCanvas(300,300);
    // var canvas = document.getElementById("defaultCanvas0");
    // ctx = canvas.getContext("2d");
    // stage = new createjs.Stage(canvas);
    // var rect = new createjs.Shape();
    // rect.graphics.beginFill("black").drawRect(0,0,canvas.width, canvas.height);
    // stage.globalCompositeOperation = "lighter";
    // stage.addChild(rect);
    // stage.update();
    // frameRate(30);

}

var indexes = [];
function draw() {
    loadPixels();
    var yoff = 0;
    for (var y = 0; y < canvas.height; y++) {
        var xoff = 0;
        for (var x = 0; x < canvas.width; x++) {
            // console.log("heloo");
            var index = (x + y * canvas.width) * 4;
            var r = noise(xoff, yoff) * 255;
            pixels[index] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = 255;

            xoff += inc;
        }
        yoff += inc;
    }
    updatePixels();
}

// function random(range) {
//     return (Math.floor(Math.random() * range) % (range * 2));
// }

function presetGradient() {
    gradient = [];
    for (var y = 0; y < canvas.height; y++) {
        gradient.push([]);
        for (var x = 0; x < canvas.width; x++) {
            gradient[y].push([Math.random() * 255, Math.random() * 255]);
        }
    }
}


// createjs.Ticker.interval = 25;
// createjs.Ticker.addEventListener("tick", draw);
