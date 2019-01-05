let ship;
let playArea = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

let stars = [];
let bullets = [];
let asteroids = [];

let targetZoom = 0.5;
let currentZoom = 0;

let renderSpace;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);

  if (width > height) {
    renderSpace = width *2;
  } else {
    renderSpace = height;
  }

  renderSpace *= 1.2;
  
  //create ship
  ship = new Ship(0,0);

  //setup play area
  playArea.top = height * -4;
  playArea.bottom = height * 4;
  playArea.left = width * -4;
  playArea.right = width * 4;


  for(let i = 0; i < 1000; i++) {
    stars.push(createVector(
      random(playArea.left, playArea.right),
      random(playArea.top, playArea.bottom),
      random(5)
      ));
  }

  for(let i = 0; i < 20; i++) {
    let x = random(playArea.left, playArea.right);

    asteroids.push(new Asteroid(
      random(playArea.left, playArea.right),
      random(playArea.top, playArea.bottom),
      random(-5, 5),
      random(-5, 5),
      random(6,10)
      ));
  }

}

function draw() {
  ship.update();

  for(let i = 0; i < asteroids.length; i++) {
    asteroids[i].update();
  }

  for(let i = asteroids.length -1; i >= 0; i--) {
    if(asteroids[i].remove) {
      asteroids.splice(i, 1);
    }
  }

  for(let i = 0; i < bullets.length; i++) {
    bullets[i].update();
  }

  for(let i = bullets.length -1; i >= 0; i--) {
    if(bullets[i].dead) {
      bullets.splice(i, 1);
    }
  }

  background(12);
  translate(width/2, height/2);
  currentZoom = lerp(currentZoom, targetZoom, 0.1);
  scale(currentZoom);
  translate(-ship.pos.x, -ship.pos.y)
  
  //visualize renderSpace
  // push();
  // noFill();
  // stroke(200,0,0);
  // strokeWeight(5);
  // ellipse(ship.pos.x, ship.pos.y, renderSpace * 2, renderSpace * 2);
  // pop();

  for(let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let d = dist(ship.pos.x, ship.pos.y, star.x, star.y);
    if (d < renderSpace) {
      push();
      noFill();
      stroke(100);
      strokeWeight(star.z);
      point(star.x, star.y);
      pop();
    }
  }

  for(let i = 0; i < bullets.length; i++) {
    bullets[i].show();
  }

  ship.show();

  for(let i = 0; i < asteroids.length; i++) {
    asteroids[i].show();
  }

  push();
  noFill();
  stroke(100);
  strokeWeight(10);
  rect(playArea.left, playArea.top, playArea.right - playArea.left, playArea.bottom - playArea.top);
  pop();

  
}

function keyPressed(){
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
    case SHIFT:
      ship.fire();
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
      targetZoom = 0.5;
      break;
  }
}