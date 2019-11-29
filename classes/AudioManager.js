class AudioManager {
    constructor() {
        this.sfx = Array.from(document.getElementsByTagName('audio'));
        this.playing = new Array(this.sfx.length).fill(false);

        this.play = function(id) {
            if(this.playing[id]) return;
            this.sfx[id].currentTime = 0;
            this.sfx[id].play();
            this.playing[id] = true;
        }
        this.stop = function(id) {
            this.sfx[id].pause();
            this.sfx[id].currentTime = 0;
            this.playing[id] = false;
        }

        for(let i = 0; i < this.sfx.length; i++) {
            this.sfx[i].addEventListener('ended', () => this.stop(i));
        }
    }
}