const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
let unitSize = 25;
let tickTime = 10;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:0, y:0}
];

// Each object is a body part of the snake, 
// they each have their own x and y coordinates.

window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);
upBtn.addEventListener("click",() => {
    if(!(yVelocity == unitSize)){
        xVelocity = 0;
        yVelocity = -unitSize;
    }
})
downBtn.addEventListener("click",() => {
    if(!(yVelocity == -unitSize)){
        xVelocity = 0;
        yVelocity = unitSize;
    }
})
leftBtn.addEventListener("click",() => {
    if(!(xVelocity == unitSize)){
        xVelocity = -unitSize;
        yVelocity = 0;
    }
})
rightBtn.addEventListener("click",() => {
    if(!(xVelocity == -unitSize)){
        xVelocity = unitSize;
        yVelocity = 0;
    }
})

// checkMobile();
showMbCtr();
gameStart();
creatFood();
drawFood();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    creatFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(() => {
           clearBoard();
           drawFood();
           moveSnake();
           drawSnake();
           checkGameOver();
           nextTick(); 
        }, 1000/tickTime);
    }else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth,gameHeight)
};
function creatFood(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum;
    }
    foodX = randomFood(0,gameWidth - unitSize)
    foodY = randomFood(0,gameHeight - unitSize)
    // console.log(foodX)
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize); // x, y, width, height
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    // if food is eater

    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreText.textContent = score;
        creatFood();

    }else{
        snake.pop()
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};
function changeDirection(event){
    const keyPressed  = event.keyCode;
    // console.log(keyPressed)
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft  = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
       
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break; 
        
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break; 

        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break; 
        }
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0 ):
        running = false;
        break;
        case(snake[0].x > (gameWidth - unitSize)):
        running = false;
        break;
        case(snake[0].y < 0):
        running = false;
        break; 
        case(snake[0].y > (gameHeight - unitSize)):
        running = false;
        break;
    }
    for(let i = 1; i < snake.length; i++){  //if change the condition to i <= snake.length, this statement will react error, because when the game begin, snake.length equals to 1, which means snake[1] isn't exist.
        console.log(snake[i])
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){




    ctx.font = "50px bigShoulderTwo";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth/2, gameHeight/2);
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [{x:0, y:0}];
    gameStart();

};
function checkMobile(){
    try{
        document.createEvent("TouchEvent");
        tickTime = 10;
        unitSize = 15;
        console.log("mobile");
        return true;
    } catch(e){
        tickTime = 10;
        unitSize = 25;
        console.log("pc");
        return false;
    }
}
function showMbCtr(){
    if(!checkMobile()){
        upBtn.style.visibility = "hidden";
        leftBtn.style.visibility = "hidden";
        rightBtn.style.visibility = "hidden";
        downBtn.style.visibility = "hidden";
        // console.log()
        console.log("pc-2")
    }else{
        upBtn.style.visibility = "visible";
        leftBtn.style.visibility = "visible";
        rightBtn.style.visibility = "visible";
        downBtn.style.visibility = "visible";
        console.log("mobile-2")
    }
}


