const selectEl = document.querySelector('#task');
const btn = document.querySelector('#btn');
const dragEl = document.querySelector('.block');
const container = document.querySelector('.container');

selectEl.addEventListener("change", (e) => {
    if (e.target.options.selectedIndex === 1) {
        btn.classList.add('active');
        dragEl.removeEventListener("mousedown", mouseDown);
        dragEl.addEventListener("click", go);
    } else {
        btn.classList.remove("active");   
        dragEl.addEventListener("mousedown", mouseDown);
        stop();
        dragEl.removeEventListener("click", go);
        
    }
});

// HW 1
dragEl.addEventListener('mousedown', mouseDown);

let dragElX = 0;
let dragElY = 0;  

function mouseDown(e) {
   dragElX = e.clientX - this.getBoundingClientRect().left;
   dragElY = e.clientY - this.getBoundingClientRect().top;
    document.addEventListener("mousemove", mouseMove);
}

function moveTo(x, y) {
    dragEl.style.top = y - dragElY + "px";
    dragEl.style.left = x - dragElX + "px";
    document.addEventListener("mouseup", removeMouseMove);
}

function mouseMove(e) {
    docX = e.pageX;
    docY = e.pageY;
    moveTo(docX, docY);
}

function removeMouseMove() {
    document.removeEventListener("mousemove", mouseMove);    
}

// HW 2

btn.addEventListener("click", stop);
let interval;

function go() {
    dragEl.removeEventListener("click", go);
    interval = setInterval(start, 500);
} 

function start() {
    coordDragEl = dragEl.getBoundingClientRect();
    containerCoord = container.getBoundingClientRect();
    if (containerCoord.width <= coordDragEl.right) {
      dragEl.style.left = containerCoord.left + "px";
    } else {
      dragEl.style.left = coordDragEl.left + 15 + "px";
    }
      
}

function stop() {
    clearInterval(interval);
    dragEl.addEventListener("click", go);
}