const player = document.querySelector("#player");
const field = document.querySelector(".game-field");

let posX = 230;
let posY = 180;
const step = 15;

const fieldWidth = 500;
const fieldHeight = 400;
const playerSize = 40;

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            posY = Math.max(0, posY - step);
            break;
        case "ArrowDown":
            posY = Math.min(fieldHeight - playerSize, posY + step);
            break;
        case "ArrowLeft":
            posX = Math.max(0, posX - step);
            break;
        case "ArrowRight":
            posX = Math.min(fieldWidth - playerSize, posX + step);
            break;
        default:
            return; // Игнорируем другие клавиши
    }

    player.style.top = `${posY}px`;
    player.style.left = `${posX}px`;
});