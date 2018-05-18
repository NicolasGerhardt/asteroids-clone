let ship;

function setup() {
  createCanvas(windowWidth,windowHeight);
  ship = new Ship(windowWidth/2, windowHeight/2);
}

function draw() {
  background(12);
  ship.move();
  ship.draw();

}

function keyPressed(){
  //ship.thrusting = (ship.thrusting == false); //toggles true/false
  switch (keyCode) {
    case 87:
    case 38:
      ship.startThrust();;
      break;
    
    case 65:
    case 37:
      ship.startCounterClockwise();
      break;
    case 68:
    case 39:
      ship.startClockwise();
      break;


    default:
      console.log(keyCode);
  }
}

function keyReleased() {
  switch (keyCode) {
    case 87:
    case 38:
      ship.stopThrust();
      break;
    
    case 65:
    case 37:
      ship.stopCounterClockwise();
      break;
    case 68:
    case 39:
      ship.stopClockwise();
      break;


    default:
      console.log(keyCode);
  }
}