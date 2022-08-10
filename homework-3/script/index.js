//const reg = "[^A-Za-z0-9]+";
const btnStart = document.querySelector("#start");
const btnPauseContinue = document.querySelector("#pause-continue");
const btnClear = document.querySelector("#clear");
const dataCount = document.querySelector("#value");
let count = 0;
const minValue = 1;
const maxValue = 30;
let timer;
let pause = false;
let end = false;

function start() {
    btnStart.setAttribute("disabled", "disabled");
    btnPauseContinue.removeAttribute("disabled");
    btnClear.setAttribute("disabled", "disabled");
    timer = setInterval(() => {
        const value = end ? --count : ++count;
        

        if (count === maxValue && !end) {
            clearInterval(timer);
            end = true;
            btnPauseContinue.setAttribute("disabled", "disabled");
            btnStart.removeAttribute("disabled");
            btnClear.removeAttribute("disabled");
        } else if (count === minValue && end) {
            clearInterval(timer);
            end = false;
            btnPauseContinue.setAttribute("disabled", "disabled");
            btnStart.removeAttribute("disabled");
        }
        showTimer(value);
    }, 1000);
}

function stop() {
    btnClear.removeAttribute("disabled");
    if (!pause) {
        pause = true;
        btnPauseContinue.innerHTML = "Continue";
        clearInterval(timer);
    } else {
        pause = false;
        btnPauseContinue.innerHTML = "Pause";
        btnClear.setAttribute("disabled", "disabled");
        start();
    }
    
    
}

function clear() {
    count = minValue;
    pause = false;
    end = false;
    btnPauseContinue.innerHTML = "Pause";
    btnClear.setAttribute("disabled", "disabled");
    btnPauseContinue.setAttribute("disabled", "disabled");
    btnStart.removeAttribute("disabled");
    showTimer(minValue);
    
    
}

function showTimer(value) {
    dataCount.innerHTML = value;
}

btnStart.onclick = start;
btnPauseContinue.onclick = stop;
btnClear.onclick = clear; 