var blueBalloon_Image;
var greenBalloon_Image;
var pinkBalloon_Image;
var redBalloon_Image;

var background0, backgroundImage;

var bow, bowImage;
var arrow, arrowImage;

var score = 999;

var leftEdge, rightEdge, topEdge, bottomEdge;

var blueB, redB, greenB, pinkB;

function preload() {
  blueBalloon_Image = loadImage("blue_balloon0.png");
  greenBalloon_Image = loadImage("green_balloon0.png");
  pinkBalloon_Image = loadImage("pink_balloon0.png");
  redBalloon_Image = loadImage("red_balloon0.png");

  backgroundImage = loadImage("background0.png");

  bowImage = loadImage("bow0.png");
  arrowImage = loadImage("arrow0.png");
}

function setup() {
  createCanvas(600, 600);

  camera.position.x = 0;

  background0 = createSprite(300, 300);
  background0.addImage("background0", backgroundImage);
  background0.scale = 2;

  bow = createSprite(500, 300);
  bow.addImage("bow", bowImage);
  bow.velocityX = -3;

  leftEdge = createSprite(-300, 300, 0.00000000000000000000000000000000001, 600);
  rightEdge = createSprite(600, 300, 5, 600);
  topEdge = createSprite(300, 0, 600, 5);
  bottomEdge = createSprite(300, 600, 600, 5);

  arrow = createSprite(bow.x, bow.y);
  arrow.addImage("arrow", arrowImage);
  arrow.scale = 0.2;

  blueB = createSprite(150, Math.round(random(20, 370)), 0);
  blueB.addImage("blue", blueBalloon_Image);
  blueB.scale = 0.1;
  blueB.velocityX = 8;
  blueB.lifetime = 1;
  blueB.visible = false;

  greenB = createSprite(150, Math.round(random(20, 370)), 0);
  greenB.addImage("green", greenBalloon_Image);
  greenB.scale = 0.08;
  greenB.velocityX = 8;
  greenB.lifetime = 1;
  greenB.visible = false;

  redB = createSprite(150, Math.round(random(20, 370)), 0);
  redB.addImage("red", redBalloon_Image);
  redB.scale = 0.08;
  redB.velocityX = 8;
  redB.lifetime = 1;
  redB.visible = false;

  pinkB = createSprite(150, Math.round(random(20, 370)));
  pinkB.addImage("pink", pinkBalloon_Image);
  pinkB.velocityX = 8;
  pinkB.lifetime = 1;
  pinkB.visible = false;
}

function draw() {
  background(backgroundImage);

  camera.position.x = camera.position.x - 3;

  if(camera.position.x < -50){
    camera.position.x = 300;
  }

  if(bow.x < 300){
    bow.x = 500;
    bow.y = 300;
  }

  if(score > 999){
    textSize(50);
    blueB.destroy();
    greenB.destroy();
    redB.destroy();
    pinkB.destroy();
    bow.velocityX = 0;
    arrow.destroy();
    camera.position.x = 300;
  }

  createEdgeSprites();

  var randomCreation = Math.round(random(1, 4));
  if (frameCount % 40 === 0) {
    if (randomCreation === 1) {
      blueBalloon();
    } else if (randomCreation === 2) {
      greenBalloon();
    } else if (randomCreation === 3) {
      pinkBalloon();
    } else if (randomCreation === 4) {
      redBalloon();
    }
  }

  serve();
  

  if (keyIsDown(ENTER)) {
    reset();
  }

  if (arrow.y != bow.y) {
    arrow.y = bow.y;
  }

  if (arrow.isTouching(leftEdge)) {
    arrow.x = bow.x;
    arrow.y = bow.y;
    arrow.velocityX = 0;
  }

  if (keyDown("space")) {
    arrow.velocityX = -10;
  }

  if (arrow.isTouching(blueB) && arrow.x != bow.x) {
    score = score + 100;

    arrow.x = bow.x;
    arrow.y = bow.y;

    arrow.velocityX = 0;

    arrow.destroy();
    blueB.destroy();

    arrow = createSprite(bow.x, bow.y);
    arrow.addImage("arrow", arrowImage);
    arrow.scale = 0.2;
  } else if (arrow.isTouching(redB) && arrow.x != bow.x) {
    score = score + 50;

    arrow.x = bow.x;
    arrow.y = bow.y;

    arrow.velocityX = 0;

    arrow.destroy();
    redB.destroy();

    arrow = createSprite(bow.x, bow.y);
    arrow.addImage("arrow", arrowImage);
    arrow.scale = 0.2;
  } else if (arrow.isTouching(greenB) && arrow.x != bow.x) {
    score = score + 25;

    arrow.x = bow.x;
    arrow.y = bow.y;

    arrow.velocityX = 0;

    arrow.destroy();
    greenB.destroy();

    arrow = createSprite(bow.x, bow.y);
    arrow.addImage("arrow", arrowImage);
    arrow.scale = 0.2;
  } else if (arrow.isTouching(pinkB) && arrow.x != bow.x) {
    score = score + 12.5;

    arrow.x = bow.x;
    arrow.y = bow.y;

    arrow.velocityX = 0;

    arrow.destroy();
    pinkB.destroy();

    arrow = createSprite(bow.x, bow.y);
    arrow.addImage("arrow", arrowImage);
    arrow.scale = 0.2;
  }
}

function serve() {
  if (keyIsDown(DOWN_ARROW)) {
    bow.y = bow.y + 10;
  }

  if (keyIsDown(UP_ARROW)) {
    bow.y = bow.y - 10;
  }

  drawSprites();

  fill("black");
  textSize(40);
  text(" score = " + score, 0, 50);
  text(" Press 'ENTER' to reset", 0, 590);
  textSize(20);
  text("  Key -->", 0, 370);
  text("  Blue balloon = 100 points", 0, 400);
  text("  Red balloon = 50 points", 0, 430);
  text("  Green balloon = 25 points", 0, 460);
  text("  Pink balloon = 12.5 points", 0, 490);
  text("  Reach 1000 to win",0,520);
  text("  (if everything is frozen that means you have won)",0,550);

  bow.bounceOff(topEdge);
  bow.bounceOff(bottomEdge);
}

function reset() {
  arrow.velocityX = 0;

  score = 0;

  arrow.y = bow.y;
  arrow.x = bow.x;

  blueB.destroy();
  pinkB.destroy();
  redB.destroy();
  greenB.destroy();
}

function blueBalloon() {
  blueB = createSprite(150, Math.round(random(-370, 370)), 0);
  blueB.addImage("blue", blueBalloon_Image);
  blueB.scale = 0.1;
  blueB.velocityX = 8;
  blueB.lifetime = 1000;
}

function redBalloon() {
  redB = createSprite(150, Math.round(random(-370, 370)), 0);
  redB.addImage("red", redBalloon_Image);
  redB.scale = 0.08;
  redB.velocityX = 8;
  redB.lifetime = 1000;
}

function greenBalloon() {
  greenB = createSprite(150, Math.round(random(-370, 370)), 0);
  greenB.addImage("green", greenBalloon_Image);
  greenB.scale = 0.08;
  greenB.velocityX = 8;
  greenB.lifetime = 1000;
}

function pinkBalloon() {
  pinkB = createSprite(150, Math.round(random(-370, 370)));
  pinkB.addImage("pink", pinkBalloon_Image);
  pinkB.lifetime = 1000;
  pinkB.velocityX = 8;
}