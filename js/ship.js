const SHIP_THRUST = 0.1;
const SHIP_MAX_SPEED = 10;
const SHIP_SPIN_SPEED = 0.05;
const SHIP_SIZE = 10;

class Ship {
  constructor(x,y) {
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.clockwise = false;
  this.counterClockwise = false;
  this.faceing = 0;
  this.thrusterOn = false;
  }

  update() {

    if(this.clockwise) {
      this.faceing += SHIP_SPIN_SPEED;
    }

    if(this.counterClockwise) {
      this.faceing -= SHIP_SPIN_SPEED;
    }

    if(this.thrusterOn) {
      this.acc = createVector(0, -SHIP_THRUST);
      this.acc.rotate(this.faceing);
    } else {
      this.acc.mult(0);
    }

    this.vel.add(this.acc);

    if (this.vel.mag() > SHIP_MAX_SPEED) {
      this.vel.setMag(SHIP_MAX_SPEED);
    }

    this.pos.add(this.vel);

    if (this.pos.x < playArea.left) {
      this.pos.x = playArea.left;
      this.vel.x = 0;
    } else if (this.pos.x > playArea.right) {
      this.pos.x = playArea.right;
      this.vel.x = 0;
    }
    if (this.pos.y < playArea.top) {
      this.pos.y = playArea.top;
      this.vel.y = 0;
    } else if (this.pos.y > playArea.bottom) {
      this.pos.y = playArea.bottom;
      this.vel.y = 0;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.faceing);

    if (this.thrusterOn) {
      fill("red");
      noStroke();
      rect( -SHIP_SIZE/4,SHIP_SIZE, SHIP_SIZE/2,SHIP_SIZE);
    }

    stroke(128);
    fill(128);
    beginShape();
    vertex(           0,-SHIP_SIZE);
    vertex(-SHIP_SIZE/2, SHIP_SIZE);
    vertex( SHIP_SIZE/2, SHIP_SIZE);
    endShape(CLOSE);

    pop();

  }


  startClockwise() {
    this.clockwise = true;

  }

  stopClockwise() {
    this.clockwise = false;
  }

  startCounterClockwise() {
    this.counterClockwise = true;
  }

  stopCounterClockwise() {
    this.counterClockwise = false;
  }

  startThrust() {
    this.thrusterOn = true;
  }

  stopThrust() {
    this.thrusterOn = false;
  }

}