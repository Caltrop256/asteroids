class Player {
    constructor(x,y) {
        this.zIndex = 100;

        this.position = new Vector(x,y);
        this.velocity = new Vector(0,0);
        this.angle = 270 * Math.PI / 180;
        this.shootIndex = 0;

        this.dying = false;
        this.parts = [];
        this.h = false;

        this.movementKeys = [
            false, // forward aka accelerate
            false, // rotate left
            false, // decelerate
            false, // rotate right
            false, // shoot
        ];

        this.rotate = function(n) {this.angle = (this.angle+n) % (Math.PI * 2)};
        this.accelerate = function() {
            let addV = Math.max(vw(0.01), vh(0.01));
            this.velocity.add(new Vector().manual(addV, this.angle));
            renderList.push(new EngineParticle(this.position.x, this.position.y, this.velocity));
        }
        this.decelerate = function() {
            this.velocity.mult(0.99);
        }
        this.shoot = function() {
            if(!this.shootIndex) {
                renderList.push(new Projectile(this.position.x, this.position.y, this.velocity, this.angle));
                AUDIOMANAGER.stop(5);
                AUDIOMANAGER.play(5);
            }
            this.shootIndex++;
            this.shootIndex%=10;
        }

        this.die = function() {
            for(let i = 0; i < AUDIOMANAGER.sfx.length; i++) {
                AUDIOMANAGER.stop(i);
            }
            this.dying = true;
            renderList.push(new DestructionParticle(this.position.x, this.position.y, new Vector(), 100))
            AUDIOMANAGER.play(Math.floor(Math.random() * 4) + 1);
            GAMEMANAGER.lives--;
            this.parts = [
                new ShipPart(this.position.x, this.position.y),
                new ShipPart(this.position.x, this.position.y),
                new ShipPart(this.position.x, this.position.y),
                new ShipPart(this.position.x, this.position.y)
            ]
        }

        this.update = function() {
            if(this.h) return;
            if(this.dying) {
                for(let p of this.parts) {
                    p.update();
                    p.render();
                }
                if(!this.parts.length) {
                    this.h = true;
                    GAMEMANAGER.wave--;
                    GAMEMANAGER.waveAsteroids /= 2;
                    GAMEMANAGER.lives ? setTimeout(GAMEMANAGER.restartWave, 1000) : setTimeout(gameover, 1000)
                }
                return;
            }
            this.position.add(this.velocity);
            if(this.position.x > w + vw(1)) {
                this.position.x = 0 - vw(1);
            } else if (this.position.x < 0 - vw(1)) {
                this.position.x = w + vw(1);
            }

            if(this.position.y > h + vh(1)) {
                this.position.y = 0 - vh(1);
            } else if(this.position.y < 0 - vh(1)) {
                this.position.y = h + vh(1);
            }

            if(this.movementKeys[0] && !this.movementKeys[2]) this.accelerate();
            if(this.movementKeys[1] && !this.movementKeys[3]) this.rotate(-0.05);
            if(this.movementKeys[3] && !this.movementKeys[1]) this.rotate(0.05);
            if(this.movementKeys[2] && !this.movementKeys[0]) this.decelerate();
            if(this.movementKeys[4]) this.shoot(); else this.shootIndex = 0;

            for(const a of renderList) {
                if((a instanceof Asteroid || a instanceof UFO || a instanceof UFOprojectile) && a.pointIntersects(this.position.x, this.position.y)) {
                    this.die();
                    return;
                }
            }
        }

        this.render = function() {
            if(this.dying) return;
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle + (270 * Math.PI / 180));

            ctx.beginPath();
            ctx.moveTo(0, vh(1.5));
            ctx.lineTo(vw(0.4), vh(-0.5));
            ctx.lineTo(0, vh(-0.1));
            ctx.lineTo(vw(-0.4), vh(-0.5));
            ctx.closePath();

            ctx.strokeStyle = '#FFFFFF'
            ctx.stroke();

            if(this.movementKeys[0] && !this.movementKeys[2]) {
                ctx.beginPath();
                ctx.moveTo(vw(0.35), 0);
                ctx.lineTo(vw(0.35), vh(-0.5 + Math.random() / 10))
                ctx.lineTo(vw(Math.random() * 2 - 1) * 0.5, vh(-0.25));
                ctx.lineTo(vw(-0.35), vh(-0.5 + Math.random() / 10));
                ctx.lineTo(vw(-0.35), 0);
                ctx.closePath();
                ctx.stroke();
            }

            ctx.rotate((this.angle + (270 * Math.PI / 180))*-1);
            ctx.translate(this.position.x*-1, this.position.y*-1);
        }

        this.handleKeyPress = function(e,a) {
            if(PAUSED) return
            switch(e.key) {
                case "w" :
                case "ArrowUp" :
                    this.movementKeys[0] = !!a;
                    !!a ? AUDIOMANAGER.play(0) : AUDIOMANAGER.stop(0);
                    break;
                case "a" :
                case "ArrowLeft" :
                    this.movementKeys[1] = !!a;
                    break;
                case "s" :
                case "ArrowDown" :
                    this.movementKeys[2] = !!a;
                    break;
                case "d" :
                case "ArrowRight" :
                    this.movementKeys[3] = !!a;
                    break;
                case "k" :
                case " " :
                    this.movementKeys[4] = !!a;
            }
        }

        window.addEventListener('keydown', (e) => this.handleKeyPress(e,1));
        window.addEventListener('keyup', (e) => this.handleKeyPress(e, 0))
    }
}
renderList.push(new Player(hw, hh));