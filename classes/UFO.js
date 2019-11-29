class UFO {
    constructor(x,y) {
        this.position = new Vector(x,y);
        this.target = new Vector(Math.floor(Math.random() * w), Math.floor(Math.random() * h));
        this.shootIndex = 0;

        this.update = function() {
            let velx = (this.position.x - this.target.x > 0) ? -1 : 1;
            let vely = (this.position.y - this.target.y > 0) ? -1 : 1;

            this.position.add(new Vector(velx, vely));
            if(this.position.x == this.target.x || this.target.y == this.position.y) this.target = new Vector(Math.floor(Math.random() * w), Math.floor(Math.random() * h));

            this.shootIndex++;
            this.shootIndex %= 200;
            if(this.shootIndex == 100 || this.shootIndex == 120 || this.shootIndex == 140) {
                this.shoot();
            }
        }

        this.shoot = function() {
            renderList.push(new UFOprojectile(this.position.x, this.position.y + vh(0.7), Math.atan2((this.position.y + vh(0.7)) - (renderList[0].position.y), this.position.x - renderList[0].position.x)))
            AUDIOMANAGER.stop(6);
            AUDIOMANAGER.play(6);
        }

        this.destroy = function() {
            renderList.splice(renderList.indexOf(this), 1);
            renderList.push(new DestructionParticle(this.position.x, this.position.y, new Vector(), 50))
            AUDIOMANAGER.play(Math.floor(Math.random() * 4) + 1);
            GAMEMANAGER.changeScore(200);
        }

        this.pointIntersects = function(x,y) {
            if(Math.pow(x - this.position.x, 2) + Math.pow(y - this.position.y + vh(0.7), 2) < Math.pow(vw(1), 2)) {
                return true;
            }
            if (this.position.x - vw(1.7) <= x && x <= this.position.x + vw(1.7) &&
                this.position.y - vh(0.7) <= y && y <= this.position.y + vh(0.7)) {
                return true;
            }
            return false;
        }

        this.render = function() {
            ctx.translate(this.position.x, this.position.y);

            ctx.beginPath();
            ctx.moveTo(vw(2.5), 0);
            ctx.lineTo(vw(-2.5), 0);
            ctx.lineTo(vw(-2), vh(0.7));
            ctx.lineTo(vw(2), vh(0.7));
            ctx.lineTo(vw(2.5), 0);
            ctx.lineTo(vw(1.7), vh(-0.7));
            ctx.lineTo(vw(-1.7), vh(-0.7));
            ctx.lineTo(vw(-2.5), 0);
            ctx.closePath();

            ctx.strokeStyle = '#FFFFFF';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(vw(0), vh(-0.7), vw(1), Math.PI, 0)
            ctx.closePath();

            ctx.stroke();

            ctx.translate(this.position.x * -1, this.position.y * -1)
        }
    }
}