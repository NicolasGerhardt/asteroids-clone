class Asteroid {
  constructor(x, y, dx, dy, r) {
    this.pos = createVector(x,y);
    this.vel = createVector(dx, dy);
    this.r = r;
    this.remove = false;
    }

  update() {

    if (this.pos.x < playArea.left || this.pos.x > playArea.right) {
      this.vel.x *= -1;
    }
    if (this.pos.y < playArea.top || this.pos.y > playArea.bottom) {
      this.vel.y *= -1;
    }

    this.pos.add(this.vel);

    if (this.r < 4) {
      this.remove = true;
    }

  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(200);
    let rad = 2**this.r;
    ellipse(0,0, rad, rad);

    pop();
  }

}