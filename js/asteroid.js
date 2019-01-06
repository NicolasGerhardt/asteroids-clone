class Asteroid {
  constructor(x, y, dx, dy, rad) {
    this.pos = createVector(x,y);
    this.vel = createVector(dx, dy);
    this.rad = rad;
    this.targetRad = rad;
    this.remove = false;
    }

  update() {

    if (this.pos.x - this.rad < playArea.left) {
      this.pos.x = playArea.left + this.rad;
      this.vel.x *= -1;
    } else if (this.pos.x + this.rad > playArea.right) {
      this.pos.x = playArea.right - this.rad;
      this.vel.x *= -1;
    }
    if (this.pos.y - this.rad < playArea.top) {
      this.pos.y = playArea.top + this.rad;
      this.vel.y *= -1;
    } else if (this.pos.y + this.rad > playArea.bottom) {
      this.pos.y = playArea.bottom - this.rad;
      this.vel.y *= -1;
    }

    if (this.vel.mag() > SHIP_MAX_SPEED * 2) {
      this.vel.setMag(SHIP_MAX_SPEED);
    }

    this.pos.add(this.vel);

    this.rad = lerp(this.rad, this.targetRad, 0.1);

    this.collisionCheck();

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
        bullets[i].remove = true;
        this.targetRad = sqrt(((PI*this.rad*this.rad)/2)/PI);
        if (this.targetRad < 50) {
        this.remove = true;
        } else {
          bullets[i].vel.setMag(this.vel.mag());
          this.vel = bullets[i].vel;
          this.vel.rotate(PI/2);
          this.vel.setMag(this.vel.mag()*1.5);
          let newAsterVel = createVector(this.vel.x, this.vel.y);
          newAsterVel.setMag(newAsterVel.mag() * -1);
          let newAsterPos = createVector(this.pos.x, this.pos.y);
          this.pos.add(this.vel);
          newAsterPos.add(newAsterVel);
          asteroids.push(new Asteroid(
            this.pos.x, this.pos.y,
            newAsterVel.x, newAsterVel.y,
            this.targetRad
            ));
        }
      }

    }
  }

}

function generateRandomAsteroid() {
  if (ship != null) {
    let attempts = 0;
    while(attempts < 1000) {
      attempts++;
      let r = random(60, 1000);
      let buffer = r * 2
      let x = random(playArea.left + buffer, playArea.right - buffer);
      let y = random(playArea.top + buffer, playArea.bottom - buffer);
      let dx = random(-5, 5);
      let dy = random(-5, 5);
      let d = dist(ship.pos.x, ship.pos.y, x, y);
      if (d > renderSpace) {
        asteroids.push(new Asteroid(x,y, dx,dy ,r));
        break;
      }
    }
  }
}