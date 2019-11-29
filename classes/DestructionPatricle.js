class DestructionParticle {
    constructor(x,y,v,n) {
        this.positions = [];
        this.velocities = [];
        this.lifetime = 0;

        let vel = new Vector().from(v);
        for(let i = 0; i < n; i++) {
            this.positions.push(new Vector(x,y));
            let rv = vel.add(new Vector().random(1), true)
            this.velocities.push(rv);
        }

        this.update = function() {
            this.lifetime++;
            for(let i = 0; i < this.positions.length; i++) {
                if(this.lifetime > Math.random() * 1500) {
                    this.positions.splice(i, 1);
                    this.velocities.splice(i, 1);
                    continue;
                }
                this.positions[i].add(this.velocities[i]);

                if(this.positions[i].x > w) {
                    this.positions[i].x = 0;
                } else if (this.positions[i].x < 0) {
                    this.positions[i].x = w;
                }
    
                if(this.positions[i].y > h) {
                    this.positions[i].y = 0;
                } else if(this.positions[i].y < 0) {
                    this.positions[i].y = h;
                }
            }
            if(!this.positions.length) {
                renderList.splice(renderList.indexOf(this), 1)
            }
        }

        this.render = function() {
            for(let p of this.positions) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(p.x, p.y, vw(0.2), vh(0.2));
            }
        }
    }
}