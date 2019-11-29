class UFOprojectile {
    constructor(x, y, angle) {
        this.position = new Vector(x,y);
        this.velocity = new Vector().manual(7, angle + Math.PI);

        this.update = function() {
            this.position.add(this.velocity);
            if(this.position.x > w) {
                this.destroy();
            } else if (this.position.x < 0) {
                this.destroy();
            }

            if(this.position.y > h) {
                this.destroy();
            } else if(this.position.y < 0) {
                this.destroy();
            }
        }

        this.destroy = function() {
            renderList.splice(renderList.indexOf(this), 1);
        }

        this.pointIntersects = function(x,y) {
            return (Math.pow(x - this.position.x, 2) + Math.pow(y - this.position.y, 2) < Math.pow(5, 2))
        }

        this.render = function() {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            ctx.closePath();

            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
        }
    }
}
