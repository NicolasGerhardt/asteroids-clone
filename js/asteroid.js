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

    this.collisionCheck();

    this.rad = lerp(this.rad, 2**this.r, 0.1);

  }

  show() {
    let d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
    if(d - this.rad < renderSpace) {
      push();
      translate(this.pos.x, this.pos.y);
      noStroke();
      fill(50, 100, 50);
      ellipse(0,0, this.rad * 2, this.rad * 2);
      pop();
    }
  }

  collisionCheck() {
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      let d = dist(bullet.pos.x, bullet.pos.y, this.pos.x, this.pos.y);
      if (this.rad > d) {
        bullets[i].dead = true;
        this.r--;
        if (this.r < 5) {
        this.remove = true;
        } else {
          bullets[i].vel.setMag(this.vel.mag());
          this.vel = bullets[i].vel;
          this.vel.rotate(PI/2);
          this.vel.setMag(this.vel.mag()*1.5);
          let newAsterVel = createVector(this.vel.x, this.vel.y);
          newAsterVel.setMag(newAsterVel.mag() * -1);
          asteroids.push(new Asteroid(
            this.pos.x, this.pos.y,
            newAsterVel.x, newAsterVel.y,
            this.r
            ));
        }
      }

    }
  }

}