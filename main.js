var snake = {
    initialXPosition : 0,
    initialYPosition : 0,
    headPosition : 0,
    tailPosition : 0,
    lengthBody : 2,
    direction : "right"
};

var canvasUtil = {
    canvasObj : document.getElementById("canvasElem"),
    canvasContext : null,
    snakeTimer : null,
    initializeData : function () {
        "use strict";
        if (canvasUtil.canvasObj.getContext) {
            canvasUtil.canvasContext = canvasUtil.canvasObj.getContext('2d');
        }
    },
    drawRect : function () {
        "use strict";
        canvasUtil.canvasContext.clearRect(0, 0, canvasUtil.canvasObj.width, canvasUtil.canvasObj.height);
        canvasUtil.canvasContext.fillStyle = "rgb(255, 255, 255)";
        canvasUtil.canvasContext.fillRect(snake.headPosition, snake.initialYPosition, snake.lengthBody, 2);
        snake.headPosition += 1;
    },
    
    startSnake : function () {
        "use strict";
        $(document).keypress(function (event) {
            var code = event.keyCode || event.which;
            if(event.keyCode === 37) {
                
            } else  if(event.keyCode === 38) {
                
            } else if(event.keyCode === 39) {
                
            } else if(40) {
                
            } else {
                
            }
        });
        canvasUtil.snakeTimer = setInterval(canvasUtil.drawRect, 100);
    },
    
    pauseSnake : function () {
        "use strict";
        clearInterval(canvasUtil.snakeTimer);
    }
};

canvasUtil.initializeData();

function startSnake() {
    canvasUtil.startSnake();
}

function pauseSnake() {
    canvasUtil.pauseSnake();
}
function resetSnake() {
    snake.headPosition = 0;
    pauseSnake();
    startSnake();
}