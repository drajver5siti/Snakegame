import { update as updateSnake, draw as drawSnake, handleDeath } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { hasGameStarted } from './input.js';
import { getGameScore } from './food.js';

// Known bugs
// Food sometimes spawns on top of the snake
// EXPANSION_RATE can't be greater than 3, bugs out the handleDeath function


var startText = document.getElementsByClassName('startText');
var endText = document.getElementsByClassName('endText');
export const gameBoard = document.getElementById('game-board');
const GAME_SPEED = 110 // milliseconds
export const GAME_BOARD_SIZE = 21;
export var GAME_OVER = false;
var DRAW = false;


    var gameLoop = setInterval(() => {
        if(!DRAW)
        {
            // draws the food and the snake but doesnt start the game;
            gameBoard.innerHTML = '';
            drawSnake(gameBoard);
            drawFood(gameBoard);
            DRAW = true;
        }
        if(hasGameStarted())
        {
            // when i move the snake then the game starts
            // this is beacuse i had a strange bug where even if the player is not moving the snake
            // it registers as it is moving and offsets the body, then the handleDeath function
            // returns true even tho we havent even moved yet
            update();
            draw();
            startText[0].style.visibility = "hidden";
        }
        if(GAME_OVER)
            clearInterval(gameLoop);

    }, GAME_SPEED);

function update()
{
    updateSnake();
    updateFood();
    // console.log(`Score ${getGameScore()}`);
    if(handleDeath())
    {
        GAME_OVER = true;
        endText[0].style.visibility = "visible";
        var score = document.createElement('p');
        score.appendChild(document.createTextNode(`Score: ${getGameScore()}`));
        endText[0].appendChild(score);
    }
}
function draw()
{
    gameBoard.innerHTML = ''; // when updateing the snake, this clears the before status and sets the snake;
    drawSnake(gameBoard);
    drawFood(gameBoard);
}