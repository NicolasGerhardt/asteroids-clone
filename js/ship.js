const SHIP_THRUST = 0.1;
const SHIP_MAX_SPEED = 15;
const SHIP_SPIN_SPEED = 0.05;
const SHIP_SIZE = 10;

function Ship(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.heading = 0;
  this.thrusting = false;
  this.clockwise = false;
  this.counterClockwise = false;


  this.move = function() {
    if (this.counterClockwise) {
      this.heading -= SHIP_SPIN_SPEED;
    }

    if (this.clockwise) {
      this.heading += SHIP_SPIN_SPEED;
    }
    



  }// end move funciton

  this.draw = function() {
    push();
    translate(this.x, this.y);
    rotate(this.heading);

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

  } // end draw funciton

this.startClockwise = function() {
    this.clockwise = true;

}

this.stopClockwise = function() {
  this.clockwise = false;
}

this.startCounterClockwise = function() {
  this.counterClockwise = true;
}

this.stopCounterClockwise = function() {
  this.counterClockwise = false;
}

this.startThrust = function() {
  this.thrusting = true;
}

this.stopThrust = function() {
  this.thrusting = false;
}

}// end ship class