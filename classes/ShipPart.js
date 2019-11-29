class ShipPart {
    constructor(x,y) {
        this.angle = (Math.random() * Math.PI * 2) % (2 * Math.PI);
        this.angularVelocity = (Math.random() * 2 - 1) / 10;
        this.position = new Vector(x,y);
        this.velocity = new Vector().random(0.2);
        this.lifetime = 0;

        this.update = function() {
            this.lifetime++;
            if(this.lifetime > Math.random() * 200 + 100) {
                renderList.push(new DestructionParticle(this.position.x, this.position.y, new Vector(), 30))
                AUDIOMANAGER.play(Math.floor(Math.random() * 4) + 1);
                let arr = renderList.find((o) => o instanceof Player).parts;
                arr.splice(arr.indexOf(this), 1)
            }
            this.position.add(this.velocity);
            this.angle += this.angularVelocity;
        }

        this.render = function() {
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle + (270 * Math.PI / 180));

            ctx.beginPath();
            ctx.moveTo(0,vh(-0.7));
            ctx.lineTo(0, vh(0.7));
            ctx.closePath();

            ctx.strokeStyle = '#FFFFFF'
            ctx.stroke();

            ctx.rotate((this.angle + (270 * Math.PI / 180))*-1);
            ctx.translate(this.position.x*-1, this.position.y*-1);
        }
    }
}