var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d'),
    w = canvas.width,
    h = canvas.height,
    hw = Math.round(w/2),
    hh = Math.round(h/2),
    PAUSED = true;
    renderList = [];

window.addEventListener('resize', resize);
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    w = canvas.width;
    h = canvas.height;
    hw = Math.round(w/2);
    hh = Math.round(h/2);
}
resize();

function vh(n) {
    return (n * (h/100));
}
function vw(n) {
    return (n * (w/100));
}