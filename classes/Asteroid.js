class Asteroid {
    constructor(x,y, size, vel, level) {
        this.zIndex = 100;

        this.level = level || 0;
        this.id = Math.floor(Math.random() * 10000);
        this.position = new Vector(x, y);
        this.velocity = new Vector().from(vel);
        this.angularVelocity = Math.random() * 0.02 * (this.level+1);
        this.size = size;
        this.radius = Math.max(vw(size), vh(size));

        this.verticies = [];
        var sides = Math.random() * 7 + 5;
        while(sides-->0) {
            let r = Math.random() * Math.PI * 2;
            let p = getPos(this.position.x, this.position.y, r, this.radius)

            this.verticies.push(this.position.sub(p, true));
            this.verticies[this.verticies.length-1].angle = r;
        }
        this.verticies.sort((a, b) => a.angle - b.angle);

        this.rotate = function() {
            for(let i = 0; i < this.verticies.length; i++) {
                let sub = this.radius;
                let na = (this.verticies[i].angle + this.angularVelocity) % (2 * Math.PI);

                let n = new Vector().manual(sub, na)
                this.verticies[i].x = n.x;
                this.verticies[i].y = n.y;
                this.verticies[i].angle = na;
            }
        }

        this.update = function() {
            this.position.add(this.velocity);
            this.rotate();

            if(this.position.x > w + this.radius) {
                this.position.x = 0 - this.radius;
            } else if (this.position.x < 0 - this.radius) {
                this.position.x = w + this.radius;
            }

            if(this.position.y > h + this.radius) {
                this.position.y = 0 - this.radius;
            } else if(this.position.y < 0 - this.radius) {
                this.position.y = h + this.radius;
            }
        }

        this.destroy = function() {
            renderList.splice(renderList.indexOf(this), 1);
            renderList.push(new DestructionParticle(this.position.x, this.position.y, this.velocity, [35, 22, 15, 10][this.level]))
            AUDIOMANAGER.play(Math.floor(Math.random() * 4) + 1);
            GAMEMANAGER.changeScore([20, 50, 70, 100][this.level])
            if(this.level < 3 && Math.max(vw(this.size*0.5), vh(this.size*0.5)) > 10) {
                renderList.push(new Asteroid(this.position.x, this.position.y, this.size*0.5, this.velocity.add(new Vector().random(1.5), true), this.level+1))
                renderList.push(new Asteroid(this.position.x, this.position.y, this.size*0.5, this.velocity.add(new Vector().random(1.5), true), this.level+1))
            }
        }

        this.pointIntersects = function(x,y) {
            var inside = false;
            for (var i = 0, j = this.verticies.length - 1; i < this.verticies.length; j = i++) {
                let og = this.position.add(this.verticies[i], true);
                let next = this.position.add(this.verticies[j], true);
                var xi = og.x, yi = og.y;
                var xj = next.x, yj = next.y;
        
                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        
            return inside;
        }

        this.render = function() {
            for(let i = 0; i < this.verticies.length; i++) {
                let j = i == 0 ? this.verticies.length-1 : i - 1;

                let og = this.position.add(this.verticies[i], true);
                let next = this.position.add(this.verticies[j], true);
                ctx.beginPath()
                ctx.moveTo(og.x, og.y);
                ctx.lineTo(next.x, next.y);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}
