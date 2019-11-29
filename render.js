var GAMEMANAGER = new GameManager().beginNewWave(),
    AUDIOMANAGER = new AudioManager();

(function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0,0,w,h);
    if(PAUSED) return;
    
    for(let o of renderList) {
        o.update();
        o.render();
    }
    GAMEMANAGER.update();
})();

document.onkeydown = checkPause;
function checkPause(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        togglePause()
    } else if(PAUSED) {
        unpause()
    }
};
function togglePause() {PAUSED ? unpause() : pause()};

function pause() {
    PAUSED = true;
    document.getElementsByClassName('score')[0].style.display = 'none';
    document.getElementsByClassName('wave')[0].style.display = 'none';
    document.getElementsByClassName('pausescreen')[0].style.display = 'block';
};

function unpause() {
    PAUSED = false;
    document.getElementsByClassName('score')[0].style.display = 'block';
    document.getElementsByClassName('wave')[0].style.display = 'block';
    document.getElementsByClassName('pausescreen')[0].style.display = 'none';
}

function gameover() {
    document.getElementsByClassName('score')[0].style.display = 'none';
    document.getElementsByClassName('wave')[0].style.display = 'none';
    document.getElementsByClassName('pausescreen')[1].style.display = 'block';
    PAUSED = true;
    document.onkeydown = newGame;
}

function newGame(e) {
    if (e.keyCode == 27) {
        GAMEMANAGER = new GameManager();
        GAMEMANAGER.restartWave();
        PAUSED = true;
        document.getElementsByClassName('pausescreen')[0].style.display = 'block';
        document.getElementsByClassName('pausescreen')[1].style.display = 'none';
        document.onkeydown = checkPause;
    }
}