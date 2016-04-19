var canvasObj = document.getElementById("canvasElem"),
    height = canvasObj.height,
    width = canvasObj.width,
    canvasContext = null,
    step = 10,
    boardWidth = 100,
    boardHeight = 10,
    i = (width/2.5),
    j = height - (boardHeight + 20),
    direction = 'up';

if (canvasObj.getContext) {
	canvasContext = canvasObj.getContext('2d');
}

canvasContext.fillStyle = "rgb(255,255,255)";
canvasContext.fillRect(i, 0, boardWidth, boardHeight);
canvasContext.fillRect(i, height-10, boardWidth, boardHeight);
canvasContext.fillStyle = "rgb(255,255,0)";
canvasContext.fillRect(width/2, j, 20, 20);

window.addEventListener('keydown', executeKeyPress);

var timer = setInterval(createBall, 40);

function createBall () {
    canvasContext.fillStyle = "rgb(255,255,0)";    
    canvasContext.clearRect(width/2, j, 20, 20);
    if(direction == 'up') {
        if(j < 20) {
            direction = 'down';
        } else {
            j -= step;
        }
    } else {
        if(j + 20 > (height - 20)) {
            direction = 'up';
        } else {
            j += step;
        }
    }
    canvasContext.fillRect(width/2, j, 20, 20);
}
function executeKeyPress(event) {
    canvasContext.fillStyle = "rgb(255,255,255)";
    event.preventDefault();
    switch (event.keyCode) {
        case 37:
        if(i-step >= 0 ) {
            canvasContext.clearRect(i, 0, boardWidth, boardHeight);
            canvasContext.clearRect(i, height-10, boardWidth, boardHeight);
            i -= step;
            canvasContext.fillRect(i, 0, boardWidth, boardHeight);
            canvasContext.fillRect(i, height-10, boardWidth, boardHeight);
        }
            break;
        case 39:
        if(i + step + boardWidth <=width) {
            canvasContext.clearRect(i, 0, boardWidth, boardHeight);
            canvasContext.clearRect(i, height-10, boardWidth, boardHeight);
            i += step;
            canvasContext.fillRect(i, 0, boardWidth, boardHeight);
            canvasContext.fillRect(i, height-10, boardWidth, boardHeight);
        }
            break;
        default:
            break;
    }
}

function pauseGame() {
    clearInterval(timer);
}