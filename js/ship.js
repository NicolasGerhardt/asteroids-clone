const SHIP_THRUST = 0.1;
const SHIP_MAX_SPEED = 15;
const SHIP_SPIN_SPEED = 0.05;
const SHIP_SIZE = 10;

class Ship {
  constructor(x,y) {
  this.pos = createVector(x, y);
  this.vel = createVector(1,1);
  this.acc = createVector();
  this.thrusting = false;
  this.clockwise = false;
  this.counterClockwise = false;
  this.faceing = 0;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x < playArea.left) {
      this.pos.x = playArea.left;
    } else if (this.pos.x > playArea.right) {
      this.pos.x = playArea.right;
    }
    if (this.pos.y < playArea.top) {
      this.pos.y = playArea.top;
    } else if (this.pos.y > playArea.bottom) {
      this.pos.y = playArea.bottom;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.faceing);

    if (this.thrusting) {
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
    this.thrusting = true;
  }

  stopThrust() {
    this.thrusting = false;
  }

}