import { GAME_BOARD_SIZE } from './game.js';
import { foodEaten, expandSnake, onSnake} from './snake.js';
var GAME_SCORE = 0;


let foodPosition = { x: 10, y: 7};
const EXPANSION_RATE = 3;

const randomFoodPosition = (min = 1, max = 1) =>{
    let newFoodPos;
    while(newFoodPos == null || onSnake(newFoodPos))
    {
        newFoodPos = randomGridPos(1, GAME_BOARD_SIZE);
    }
    return newFoodPos;
};

function randomGridPos(min, max)
{
    return{
        x: Math.floor(Math.random() * (max - min + 1) + min),
        y: Math.floor(Math.random() * (max - min + 1) + min)
    }
}

export function update()
{
    if( foodEaten(foodPosition) )
    {
        expandSnake(EXPANSION_RATE);
        GAME_SCORE++;
        foodPosition =  randomFoodPosition(1, GAME_BOARD_SIZE);
    }
}

export function draw(gameBoard)
{
    const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = foodPosition.x;
        foodElement.style.gridColumnStart = foodPosition.y;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
}
export function getGameScore()
{
    return GAME_SCORE;
}