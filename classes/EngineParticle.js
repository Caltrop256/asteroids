class EngineParticle {
    constructor(x,y,vel) {
        this.zIndex = 0;

        this.id = Math.floor(Math.random() * 10000);
        this.position = new Vector(x,y);
        this.velocity = new Vector().from(vel).mult(-0.2);
        let randOrientation = new Vector().manual(Math.random() * 5 - 2.5, (Math.random() * 50 - 25) * Math.PI / 180);
        this.velocity.add(randOrientation)
        this.lifetime = 0;

        this.update = function() {
            this.lifetime++;
            this.position.add(this.velocity)
            if(this.lifetime > Math.random() * 2000) {
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
        }

        this.render = function() {
            ctx.beginPath()
            ctx.strokeStyle = '#808080'
            ctx.arc(this.position.x, this.position.y, Math.max(vh(0.2), vw(0.2)), 0, Math.PI * 2, false);
            ctx.closePath()
            ctx.stroke();
        }
    }
}