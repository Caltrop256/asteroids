class Vector {
    constructor(x,y) {
        this.x = x || 0;
        this.y = y || 0;

        this.add = function(v, dm) {
            if(dm) {
                return new Vector(this.x + v.x, this.y + v.y)
            } else {
                this.x += v.x;
                this.y += v.y;
                return this;
            }
        }

        this.sub = function(v, dm) {
            if(dm) {
                return new Vector(this.x - v.x, this.y - v.y)
            } else {
                this.x -= v.x;
                this.y -= v.y;
                return this;
            }
        }

        this.mult = function(v) {
            if(typeof(v) == "number") {
                this.x *= v;
                this.y *= v;
            } else {
                this.x *= v.x;
                this.y *= v.y;
            }
            return this;
        }

        this.distance = function(v) {
            return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
        }

        this.from = function(o) {
            return new Vector(o.x, o.y);
        }

        this.manual = function(length, angle,x=0,y=0) {
            return new Vector(length * Math.cos(angle) + x, length * Math.sin(angle) + y)
        }

        this.random = function(r) {
            return new Vector(Math.random() * r - (r/2), Math.random() * r - (r/2))
        }
    }
};

function getPos(x, y, a, r) {
    return new Vector(x + r * Math.cos(a), y + r * Math.sin(a))
}