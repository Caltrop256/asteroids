class Projectile {
    constructor(x, y, vel, a) {
        this.zIndex = 0;

        this.angle = a;
        this.id = Math.floor(Math.random() * 10000);
        this.position = new Vector(x,y);
        this.velocity = new Vector().from(vel).mult(1.2);
        this.velocity.add(new Vector().manual(10, this.angle))
        this.lifetime = 0;

        this.update = function() {
            this.lifetime++;
            this.position.add(this.velocity)
            if(this.lifetime > Math.random() * 2000 + 100) {
                renderList.splice(renderList.indexOf(this), 1);
            }

            if(this.position.x > w + vw(0.2)) {
                this.position.x = 0 - vw(0.2);
            } else if (this.position.x < 0 - vw(0.2)) {
                this.position.x = w + vw(0.2);
            }

            if(this.position.y > h + vh(0.2)) {
                this.position.y = 0 - vh(0.2);
            } else if(this.position.y < 0 - vh(0.2)) {
                this.position.y = h + vh(0.2);
            }

            for(const a of renderList) {
                if((a instanceof Asteroid || a instanceof UFO) && a.pointIntersects(this.position.x, this.position.y)) {
                    a.destroy();
                    renderList.splice(renderList.indexOf(this), 1);
                }
            }
        }

        this.render = function() {
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle + (270 * Math.PI / 180));

            ctx.beginPath();
            ctx.moveTo(0, vh(0.5));
            ctx.lineTo(0, vh(-0.5))
            ctx.closePath();

            ctx.strokeStyle = '#D1D1D1'
            ctx.stroke();

            ctx.rotate((this.angle + (270 * Math.PI / 180))*-1);
            ctx.translate(this.position.x*-1, this.position.y*-1);
        }
    }
}