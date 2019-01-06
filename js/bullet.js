class Bullet {
  constructor(x, y, mag, facing) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -SHIP_MAX_SPEED * 1.2);
    this.vel.rotate(facing);
    this.remove = false;
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x < playArea.left || this.pos.x > playArea.right ||
        this.pos.y < playArea.top || this.pos.y > playArea.bottom) {
      this.remove = true;
    }
  }

  show() {
    let d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
    if(d < renderSpace) {
      push();
      noFill();
      stroke(255,255,0);
      strokeWeight(3);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading() + PI/2);
      line(0, 0, 0, -this.vel.mag());
      stroke(200,0,0);
      line(0,0,0, 20);
      pop();
    }
  }

}