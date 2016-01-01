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
    initializeData : function () {
        "use strict";
        if (canvasUtil.canvasObj.getContext) {
            canvasUtil.canvasContext = canvasUtil.canvasObj.getContext('2d');
            canvasUtil.startSnake();
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
        setInterval(canvasUtil.drawRect, 100);
    },
    
    stopSnake : function () {
        "use strict";
        clearInterval();
    }
};

canvasUtil.initializeData();