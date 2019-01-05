const SHIP_THRUST = 1;
const SHIP_MAX_THRUST = 1;
const SHIP_MAX_SPEED = 100;
const SHIP_SPIN_SPEED = 0.1;
const SHIP_SIZE = 30;

class Ship {
  constructor(x,y) {
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.clockwise = false;
  this.counterClockwise = false;
  this.faceing = 0;
  this.thrusterOn = false;
  this.currentThrust = 0;
  }

  update() {

    if(this.clockwise) {
      this.faceing += SHIP_SPIN_SPEED;
    }

    if(this.counterClockwise) {
      this.faceing -= SHIP_SPIN_SPEED;
    }

    if(this.thrusterOn) {
      this.currentThrust = lerp(this.currentThrust, SHIP_MAX_THRUST, 0.1);
      this.acc = createVector(0, -this.currentThrust);
      this.acc.rotate(this.faceing);
    } else {
      this.acc.mult(0);
      this.currentThrust = 0;
    }

    this.vel.add(this.acc);

    if (this.vel.mag() > SHIP_MAX_SPEED) {
      this.vel.setMag(SHIP_MAX_SPEED);
    }

    this.pos.add(this.vel);

    if (this.pos.x <= playArea.left) {
      this.pos.x = playArea.left;
      this.vel.x = 0;
      this.vel.y *= 0.99;
    } else if (this.pos.x >= playArea.right) {
      this.pos.x = playArea.right;
      this.vel.x = 0;
      this.vel.y *= 0.99;
    }
    if (this.pos.y <= playArea.top) {
      this.pos.y = playArea.top;
      this.vel.y = 0;
      this.vel.x *= 0.99;
    } else if (this.pos.y >= playArea.bottom) {
      this.pos.y = playArea.bottom;
      this.vel.y = 0;
      this.vel.x *= 0.99;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.faceing);

    if (this.thrusterOn) {
      fill(255,255,0);
      noStroke();
      //rect( -SHIP_SIZE/4,SHIP_SIZE/2, SHIP_SIZE/2,SHIP_SIZE);
      let thrustSize = this.currentThrust / SHIP_MAX_THRUST;
      beginShape();
      vertex( -SHIP_SIZE/4, SHIP_SIZE/2);
      vertex( SHIP_SIZE/4, SHIP_SIZE/2);
      vertex( 0, SHIP_SIZE * 3 * thrustSize);
      endShape();
      fill(255,0,0);
      beginShape();
      vertex( -SHIP_SIZE/5, SHIP_SIZE/2);
      vertex( SHIP_SIZE/5, SHIP_SIZE/2);
      vertex( 0, SHIP_SIZE * 2 * thrustSize);
      endShape();
    }

    stroke(128);
    fill(255,105,180);
    beginShape();
    vertex(           0,-SHIP_SIZE);
    vertex(-SHIP_SIZE/2, SHIP_SIZE/2);
    vertex( SHIP_SIZE/2, SHIP_SIZE/2);
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

  fire() {
    bullets.push(new Bullet(this.pos.x, this.pos.y, this.vel.mag(), this.faceing));
  }

}