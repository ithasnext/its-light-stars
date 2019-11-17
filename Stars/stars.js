//take random points in the canvas and make it a white square,tilted.
//fade out on every tick
var canvas;
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
        rect.x = Math.floor(Math.random() * canvas.width);
        rect.y = Math.floor(Math.random() * canvas.height);
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
    createCanvas(500,500);
    canvas = document.getElementById("defaultCanvas0");
    stage = new createjs.Stage(canvas);
    var rect = new createjs.Shape();
    rect.graphics.beginFill("black").drawRect(0,0,canvas.width, canvas.height);
    stage.globalCompositeOperation = "lighter";
    stage.addChild(rect);
    stage.update();
}


/**
function sample(x, y)
{
    return values[(x &amp; (width - 1)) + (y &amp; (height - 1)) * w];
}

public void setSample(int x, int y, double value)
{
    values[(x &amp; (width - 1)) + (y &amp; (height - 1)) * width] = value;
}

double[] values = new double[width * height];

for( int y = 0; y &lt; height; y += featuresize)
    for (var x = 0; x < width; x += featuresize)
    {
        setSample(x, y, frand());  //IMPORTANT: frand() is a random function that returns a value between -1 and 1.
    }

function sampleSquare(x, y, size, value)
{
    var hs = size / 2;

    // a     b
    //
    //    x
    //
    // c     d

    var a = sample(x - hs, y - hs);
    var b = sample(x + hs, y - hs);
    var c = sample(x - hs, y + hs);
    var d = sample(x + hs, y + hs);

    setSample(x, y, ((a + b + c + d) / 4.0) + value);

}

function sampleDiamond(int x, int y, int size, double value)
{
    var hs = size / 2;

    //   c
    //
    //a  x  b
    //
    //   d

    var a = sample(x - hs, y);
    var b = sample(x + hs, y);
    var c = sample(x, y - hs);
    var d = sample(x, y + hs);

    setSample(x, y, ((a + b + c + d) / 4.0) + value);
}

function diamondSquare(stepsize, scale)
{

    var halfstep = stepsize / 2;

    for (var y = halfstep; y < h + halfstep; y += stepsize)
    {
        for (var x = halfstep; x < w + halfstep; x += stepsize)
        {
            sampleSquare(x, y, stepsize, frand() * scale);
        }
    }

    for (var y = 0; y < h; y += stepsize)
    {
        for (var x = 0; x < w; x += stepsize)
        {
            sampleDiamond(x + halfstep, y, stepsize, frand() * scale);
            sampleDiamond(x, y + halfstep, stepsize, frand() * scale);
        }
    }

}

*/
