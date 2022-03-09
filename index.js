

const gridContainer = document.getElementById('grid-container');
const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const restartBtn= document.getElementById('restart');
const gameOverDiv = document.getElementById('game-over-div');
const score = document.getElementById('score');
let currentScore = 0;
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let snakeSpeed = 1000;
const speed = 0.9;
let timerId = 0;

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < 100; i++) {
     //create element
    const square = document.createElement('div');
    //add styling to the element
    square.classList.add('square');
    //put the element into our grid
    grid.appendChild(square);
    //push it into a new squares array    
    squares.push(square);
    }
}


createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))



// this function starts/restarts the game
function startGame(){
    gridContainer.style.display = "block"; 
    gameOverDiv.style.display = "none";

    clearInterval(timerId);

    // remove snake from grid
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    
    // remove apple & generate a new one
    squares[appleIndex].classList.remove('apple');
    generateApples()

    currentSnake = [2,1,0];
    currentScore = 0;
    direction = 1;
    snakeSpeed = 1000;

    // reset score
    score.textContent = 0;
  
    // add new snake to grid
    currentSnake.forEach(index => squares[index].classList.add('snake'));
   
    // setInterval runs the function passed to it as often as we specifiy
    timerId = setInterval(move, snakeSpeed);
}



/*
     this function moves our sanke around the grid until we either crash into the walls or
     crash into ourself    
 */
function move() {
    if (
        (currentSnake[0] + width >= 100 && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === 9 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    {
        // if any of the above condtions are true clearInterval stops the game
        gridContainer.style.display = "none"; 
        gameOverDiv.style.display = "block";
        return clearInterval(timerId);
    }
    
    //remove last element from our currentSnake array
    const tail = currentSnake.pop();
    //remove styling from last element

    squares[tail].classList.remove('snake');
    
    //add sqaure in direction we are heading
    const head = (currentSnake[0]) + direction;
    currentSnake.unshift(head);
    
    
    //add styling so we can see it
    squares[head].classList.add('snake');

    // deal with sanke head getting the apple
    if(squares[head].classList.contains('apple')){
        // remove class 'apple'
        squares[head].classList.remove('apple');

        // grow snake by one by a adding a class of 'snake'
        squares[tail].classList.add('snake');

        // grow currentSnake array
        currentSnake.push(tail);

        // generate a new apple
        generateApples()

        // add one to the score and display it
        currentScore++;
        score.textContent = currentScore;

        // speed up the snake movement
        clearInterval(timerId); // first clear timerId
        snakeSpeed *= speed;
        timerId = setInterval(move, snakeSpeed);

    }

}




// this functions randomly generates apples on the board
function generateApples(){
    do{
        // generate random number
        appleIndex = Math.floor(Math.random() * squares.length); 

    }while(squares[appleIndex].classList.contains('snake'));

    squares[appleIndex].classList.add('apple')
}
generateApples()




// this functions is use to set the value of direction
function controls(event){
    
/*  key codes:
        39 is right arrow
        38 is for the up arrow
        37 is for the left arrow
        40 is for the down arrow

    .keyCode is deprecated use .key instead
*/

    if(event.keyCode === 37){
        direction = -1
    }
    else if(event.keyCode === 38){
        direction = -width

    }
    else if(event.keyCode === 39){
        direction = 1;
    }
    else if(event.keyCode === 40){
        direction = width
    }
}



document.addEventListener('keyup', controls);
startButton.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);