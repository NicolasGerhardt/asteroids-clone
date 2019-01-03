let ship;
let playArea = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

let stars = [];

let targetZoom = 1;
let currentZoom = 0;

function setup() {
  createCanvas(800,800);
  
  //create ship
  ship = new Ship(0,0);

  //setup play area
  playArea.top = height * -2 ;
  playArea.bottom = height * 2;
  playArea.left = width * -2;
  playArea.right = width * 2;


  for(let i = 0; i < 100; i++) {
    stars.push(createVector(
      random(playArea.left, playArea.right),
      random(playArea.top, playArea.bottom),
      random(5)
      ));
  }

}

function draw() {
  ship.update();

  background(12);
  translate(width/2, height/2);
  currentZoom = lerp(currentZoom, targetZoom, 0.1);
  scale(currentZoom);
  translate(-ship.pos.x, -ship.pos.y)
  

  for(let i = 0; i < stars.length; i++) {
    let star = stars[i];
    push();
    noFill();
    stroke(100);
    strokeWeight(star.z);
    point(star.x, star.y);
    pop();
  }

  push();
  noFill();
  stroke(100);
  strokeWeight(10);
  rect(playArea.left, playArea.top, playArea.right - playArea.left, playArea.bottom - playArea.top);
  pop();

  
  ship.show();

}

function keyPressed(){
  //ship.thrusting = (ship.thrusting == false); //toggles true/false
  switch (keyCode) {
    case UP_ARROW:
      ship.startThrust();;
      break;
    
    case LEFT_ARROW:
      ship.startCounterClockwise();
      break;
    case RIGHT_ARROW:
      ship.startClockwise();
      break;
    case 189:
      targetZoom = 0.1;
      break;
    default:
      console.log(keyCode);
  }
}

function keyReleased() {
  switch (keyCode) {
    case UP_ARROW:
      ship.stopThrust();
      break;
    case LEFT_ARROW:
      ship.stopCounterClockwise();
      break;
    case RIGHT_ARROW:
      ship.stopClockwise();
      break;
    case 189:
      targetZoom = 1;
      break;
  }
}