const c = document.getElementById("canvas")
const ctx = c.getContext("2d")

let score = 0
document.getElementById("score").innerHTML = score
let highScore = 0;
document.getElementById("high_score").innerHTML = highScore


let direction = "ArrowRight";
// let turn = 0;
let tempTurn = 0;

let block0 = {x: 20, y: 20, w: 40, h: 20, color: "#00ff00", turn: 0}
let block1 = {x: 80, y: 20, w: 60, h: 20, color: "#ff0000", turn: 0}
let block2 = {x: 160, y: 20, w: 20, h: 20, color: "#00FFFFFF", turn: 0}

let blocks = [block0, block1, block2]
let number = 0

for (let i = 0; i < blocks.length; i++) {
    ctx.fillStyle = blocks[i].color
    ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h)
}

setInterval(gameLoop, 1000000000)



function gameLoop() {
    ctx.clearRect(0,0, c.width, c.height)
    blocks[number].y += 20
    for (let i = 0; i < blocks.length; i++) {
        ctx.fillStyle = blocks[i].color
        ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h)
    }
}

function move() {
    ctx.clearRect(0, 0, c.width, c.height)
    for (let i = 0; i < blocks.length; i++) {
        ctx.fillStyle = blocks[i].color
        ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h)
    }
    collision()
}

function turning() {
    if (blocks[number].turn === 0) {
        tempTurn = blocks[number].w
        blocks[number].w = blocks[number].h
        blocks[number].h = tempTurn
    } else if (blocks[number].turn === 1) {
        tempTurn = blocks[number].w
        blocks[number].w = blocks[number].h
        blocks[number].h = tempTurn
        blocks[number].w *= -1
    } else if (blocks[number].turn === 2) {
        tempTurn = blocks[number].w
        blocks[number].w = blocks[number].h
        blocks[number].h = tempTurn
        blocks[number].w *= -1
    } else if (blocks[number].turn === 3) {
        tempTurn = blocks[number].w
        blocks[number].w = blocks[number].h
        blocks[number].h = tempTurn
        blocks[number].w *= -1
        blocks[number].h *= -1
    }
}

function collision() {
    for (let i = 0; i < blocks.length - 1; i++) {
        if (
            blocks[number].x < blocks[number + (i + 1)].x + blocks[number + (i + 1)].w &&
            blocks[number].x + blocks[number].w > blocks[number + (i + 1)].x &&
            blocks[number].y < blocks[number + (i + 1)].y + blocks[number + (i + 1)].h &&
            blocks[number].y + blocks[number].h > blocks[number + (i + 1)].y
        ) {
            console.log("coll")
        }
    }
}


function switching() {
    for (let i = 0; i < (blocks.length); i++) {
        if (number === i) {
            if ((blocks.length - 1) === i) {
                number = 0;
                break;
            }

            number = i + 1;
            break;
        }
    }
}


addEventListener('keydown', (event) => {
    if (event.code === "ArrowUp") {
        direction = "ArrowUp"
        blocks[number].y -= 20
    }
    if (event.code === "ArrowDown") {
        direction = "ArrowDown"
        blocks[number].y += 20
    }
    if (event.code === "ArrowLeft") {
        direction = "ArrowLeft"
        blocks[number].x -= 20
    }
    if (event.code === "ArrowRight") {
        direction = "ArrowRight"
        blocks[number].x += 20
    }
    if (event.code === "Space"){
        if (blocks[number].turn <= 2) {
            turning()
            blocks[number].turn++
        } else if (blocks[number].turn === 3) {
            turning()
            blocks[number].turn = 0
        }
    }
    if (event.code === "Enter"){
        switching()
    }
    move()
});

// function gameOver() {
//     alert("GAME OVER");
// }
//
// function reset() {
//
// }