var controller = {
    createSnakeAndFood : function () {
        "use strict";
        snakeProp.snakeBody = [];
        var i = 0, sk = null;
        while (i < 30) {
            sk = new SnakeObj(i, 0, "moveRight");
            snakeProp.snakeBody.push(sk);
            i = i + 1;
        }
        snakeProp.snakeHead = new SnakeObj(i - 1, 0, "moveRight");
           
        food.x = randomIntFromInterval(1, width - 1);
        food.y = randomIntFromInterval(1, height - 1);
    },
    clearCanvas : function () {
        canvasContext.clearRect(0, 0, width, height);
    }   
};