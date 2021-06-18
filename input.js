import { getSnakeLenght } from './snake.js';
import {GAME_OVER} from './game.js';

let inputDirection = {x:0, y:0};
let previousDirection = {x:0, y:0};

let gameStarted = false;

window.addEventListener('keydown', e =>{
    switch(e.key)
    {
        case "ArrowUp":
            gameStarted = true;
            if(getSnakeLenght()>1 && previousDirection.y != 0)
                break;
            inputDirection = {x:0, y:-1};
            break;
        case "ArrowDown":
            gameStarted = true;
            if(getSnakeLenght()>1 && previousDirection.y != 0)
                break;
            inputDirection = {x:0, y:1};
            break;
        case "ArrowRight":
            gameStarted = true;
            if(getSnakeLenght()>1 && previousDirection.x != 0)
                break;
            inputDirection = {x:1, y:0};
            break;
        case "ArrowLeft":
            gameStarted = true;
            if(getSnakeLenght()>1 && previousDirection.x != 0)
                break;
            inputDirection = {x:-1, y:0};
            break;
        case "Enter":
            if( GAME_OVER )
                window.location = '/';
    }
});


export function getInputDirection()
{
    previousDirection = inputDirection;
    return inputDirection;
}
export function hasGameStarted()
{
    return gameStarted;
}