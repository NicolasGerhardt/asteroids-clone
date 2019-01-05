class Bullet {
  constructor(x, y, mag, facing) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -mag - 20);
    this.vel.rotate(facing);
    this.dead = false;
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x < playArea.left || this.pos.x > playArea.right ||
        this.pos.y < playArea.top || this.pos.y > playArea.bottom) {
      this.dead = true;
    }
  }

  show() {
    push();
    noFill();
    stroke(255,255,0);
    strokeWeight(3);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + PI/2);
    line(0, 0, 0, -this.vel.mag());
    strokeWeight(20);
    stroke(200,0,0);
    point(0,0);
    pop();
  }

}