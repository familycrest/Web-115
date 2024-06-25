let out = document.getElementById("output");
let interv;
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);

function printLoop() {
    loop.innerHTML += "<br>Hi there<br>"
}

function start() {
    if (!interv)
        interv = window.setInterval(printLoop, 1000);
}

function stop() {
    if (interv) {
        window.clearInterval(interv);
        interv = undefined;
    }
}
