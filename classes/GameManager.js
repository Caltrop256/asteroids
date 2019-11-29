class GameManager {
    constructor() {
        this.wave = 0;
        this.waveAsteroids = 1;
        this.scoreP = document.getElementById('score');
        this.waveP = document.getElementById('wave');
        this.score = 0;
        this.lives = 3;

        this.beginNewWave = function() {
            this.wave++;
            this.waveAsteroids *= 2;

            for(let i = 0; i < this.waveAsteroids; i++) {
                let p = getPos(hw,hh, Math.random() * Math.PI * 2, Math.max(h,w) * 2)
                renderList.push(new Asteroid(p.x, p.y, Math.random() * 4 + 3, new Vector().random(7)))
            }
            setTimeout(() => {
                for(let i = 0; i < Math.floor(this.wave/2); i++) {
                    renderList.push(new UFO(Math.random() > 0.5 ? w+20 : -20, hh))
                }
            },10000)
            this.waveP.innerHTML = this.wave.toString().padStart(2, '0');
            return this;
        }

        this.update = function() {
            if(!renderList.some((o) => o instanceof Asteroid || o instanceof UFO)) {
                this.beginNewWave();
            }
            for(let i = 1; i <= this.lives; i++) {
                ctx.translate(vw(i * 1.5), vh(6));
                ctx.rotate(Math.PI)

                ctx.beginPath();
                ctx.moveTo(0, vh(1.5));
                ctx.lineTo(vw(0.4), vh(-0.5));
                ctx.lineTo(0, vh(-0.1));
                ctx.lineTo(vw(-0.4), vh(-0.5));
                ctx.closePath();

                ctx.strokeStyle = '#FFFFFF'
                ctx.stroke();
                
                ctx.rotate(Math.PI*-1)
                ctx.translate(vw(i * 1.5) * -1, vh(6) *-1)
            }
        }

        this.restartWave = function() {
            renderList = [new Player(hw, hh)];
            for(let i = 0; i < this.waveAsteroids; i++) {
                let p = getPos(hw,hh, Math.random() * Math.PI * 2, Math.max(h,w) * 2)
                renderList.push(new Asteroid(p.x, p.y, Math.random() * 4 + 3, new Vector().random(7)))
            }
        }

        this.changeScore = function(n) {
            this.score += n;
            this.scoreP.innerHTML = 'SCORE: ' + this.score;
        }
    }
}