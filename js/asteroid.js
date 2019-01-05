class Asteroid {
  constructor(x, y, dx, dy, r) {
    this.pos = createVector(x,y);
    this.vel = createVector(dx, dy);
    this.r = r;
    this.rad = 2**this.r;
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

    if (this.r < 5) {
      this.remove = true;
    }

    this.collisionCheck();

    this.rad = lerp(this.rad, 2**this.r, 0.1);

  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(50, 100, 50);
    ellipse(0,0, this.rad, this.rad);

    pop();
  }

  collisionCheck() {
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      let d = dist(bullet.pos.x, bullet.pos.y, this.pos.x, this.pos.y);
      if (this.rad/2 > d) {
        this.r--;
        bullets[i].dead = true;
        this.vel.rotate(PI/2);
        this.vel.setMag(this.vel.mag()*2);
      }

    }
  }

}