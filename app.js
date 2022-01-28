let gameDiv
let timerDiv
let titleDiv
let gameDifficultySelect
let difficultySelectDiv
let selectedDifficulty
let gameTiles
let countdownTotal
let gameTimeTotal
let totalTiles
let titleCard
let mainGameDiv
let mainTimerDiv
let gameEndDiv
// global variables which are constantly being changed or invoked

const uniFunctions = {
    docSelectors(){
        titleCard = document.querySelector("#title-card")
        gameDifficultySelect = document.querySelector("#game-difficulty-select")
        mainTimerDiv = document.querySelector("#timer-div")
        gameEndDiv = document.querySelector("#game-end-div")
    }, //selects docs for functions which need them

    createEGameComponents(){
        gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon"]
        selectedDifficulty = "E"
        gameDiv = document.createElement("div")
        gameDiv.id = "game-divE"
        timerDiv = document.createElement("div")
        timerDiv.id = "timer-div"
        totalTiles = 12
        countdownTotal = 3
        gameTimeTotal = 20
    }, //creates components for the easy difficulty game

    createMGameComponents(){
        gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon", "Banana", "Pear", "Kiwi", "Strawberry"]
        selectedDifficulty = "M"
        gameDiv = document.createElement("div")
        gameDiv.id = "game-divM"
        timerDiv = document.createElement("div")
        timerDiv.id = "timer-div"
        totalTiles = 20
        countdownTotal = 5
        gameTimeTotal = 30
    }, //creates components for the medium difficulty game

    createHGameComponents(){
        gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon", "Banana", "Pear", "Kiwi", "Strawberry", "Blueberries", "Coconut", "Avocado", "Lime", "Peach"]
        selectedDifficulty = "H"
        gameDiv = document.createElement("div")
        gameDiv.id = "game-divH"
        timerDiv = document.createElement("div")
        timerDiv.id = "timer-div"
        totalTiles = 30
        countdownTotal = 7
        gameTimeTotal = 45
    }, //creates components for the hard difficulty game

    createMenuComponents(){
        document.body.style.backgroundImage = "url('./assets/Title-BG.jpg')"
        titleDiv = document.createElement("div")
        titleDiv.id = "title-card"
        titleDiv.innerHTML = `<h1>Memory Tile Match!</h1>
        <h3>A simple memory game by Christian Chicas</h3>
        <button id="play-button" onclick="difficultySelectScreen()">Play</button>`
        document.body.append(titleDiv)
    }, //creates components for the main menu

    gameEndScreen(){
        mainGameDiv = document.querySelector(`#game-div${selectedDifficulty}`)
        mainGameDiv.remove()
        gameEndDiv = document.createElement("div")
        gameEndDiv.id = "game-end-div"
        gameEndDiv.innerHTML = `<h1>Play Again?</h1>
        <button id="playAgain-button" onclick="mainGame${selectedDifficulty}()">Play Again</button>
        <button id="mainMenu-button" onclick="titleScreen()">Main Menu</button>`
        document.body.append(gameEndDiv)
    }, //creates conditions for the end game screen to appear

    randomizeTime(){
        return Math.floor(Math.random() * 500)
    }, //generates a random number which between 0 and 500, used for timeout duration
    
    timeout(duration){
        return new Promise(function(resolve){
            setTimeout(resolve, duration)
        })
    } //sets timeout for set or random durations
} // universal functions used throughout this code

function titleScreen(){
    uniFunctions.docSelectors()
    if (titleCard == null){
        mainTimerDiv.remove()
        gameEndDiv.remove()
        uniFunctions.createMenuComponents()
    }
} //replicates initial title screen, which allows for addition of main menu button

function difficultySelectScreen(){
    uniFunctions.docSelectors()
    titleCard.remove()
    difficultySelectDiv = document.createElement("div")
    difficultySelectDiv.id = "game-difficulty-select"
    difficultySelectDiv.innerHTML = `<h1>Select a difficulty!</h1>
    <button id="easy-button" onclick="mainGameE()">Easy</button>
    <button id="medium-button" onclick="mainGameM()">Medium</button>
    <button id="hard-button" onclick="mainGameH()">Hard</button>`
    document.body.append(difficultySelectDiv)
} //creates difficulty select screen

async function mainGameE(){
    uniFunctions.docSelectors()
    if (gameDifficultySelect != null){
        gameDifficultySelect.remove()
    }

    if (mainTimerDiv != null){
        mainTimerDiv.remove()
        gameEndDiv.remove()
        uniFunctions.createEGameComponents()
    } else {
        uniFunctions.createEGameComponents()
    }

    document.body.style.backgroundImage = "url('./assets/E-Game/E-Game-BG.jpg')"
    timerDiv.textContent = "LOADING TILES..."
    document.body.append(timerDiv)
    await randomizeTiles()
    document.body.append(gameDiv)
    await timer()
    tileFlip()
} //runs main code for the game's easy difficulty

async function mainGameM(){
    uniFunctions.docSelectors()
    if (gameDifficultySelect != null){
        gameDifficultySelect.remove()
    }

    if (mainTimerDiv != null){
        mainTimerDiv.remove()
        gameEndDiv.remove()
        uniFunctions.createMGameComponents()
    } else {
        uniFunctions.createMGameComponents()
    }

    document.body.style.backgroundImage = "url('./assets/M-Game/M-Game-BG.jpg')"
    timerDiv.textContent = "LOADING TILES..."
    document.body.append(timerDiv)
    await randomizeTiles()
    document.body.append(gameDiv)
    await timer()
    tileFlip()
} //runs main code for the game's medium difficulty

async function mainGameH(){
    uniFunctions.docSelectors()
    if (gameDifficultySelect != null){
        gameDifficultySelect.remove()
    }

    if (mainTimerDiv != null){
        mainTimerDiv.remove()
        gameEndDiv.remove()
        uniFunctions.createHGameComponents()
    } else {
        uniFunctions.createHGameComponents()
    }

    document.body.style.backgroundImage = "url('./assets/H-Game/H-Game-BG.jpg')"
    timerDiv.textContent = "LOADING TILES..."
    document.body.append(timerDiv)
    await randomizeTiles()
    document.body.append(gameDiv)
    await timer()
    tileFlip()
} //runs main code for the game's hard difficulty

async function randomizeTiles(){
    await uniFunctions.timeout(uniFunctions.randomizeTime())
    async function randomizerOne(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[i]}`
                randomTileFront.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Front-Tile-${gameTiles[i]}.png`
                await uniFunctions.timeout(uniFunctions.randomizeTime())
                gameDiv.append(randomTileFront)
            }
    }

    async function randomizerTwo(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[(gameTiles.length - 1) - i]}`
                randomTileFront.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Front-Tile-${gameTiles[(gameTiles.length - 1) - i]}.png`
                await uniFunctions.timeout(uniFunctions.randomizeTime())
                gameDiv.append(randomTileFront)
            }
    }
    return [await Promise.all([
        randomizerOne(), 
        randomizerTwo()
    ])]
} //appends tiles to the game board within random intervals

async function timer(){
    async function countDown(){
        for(let i = (countdownTotal + 2); i > 0; i--){
            if(countdownTotal >= 0){
                timerDiv.textContent = `GAME STARTING IN: ${countdownTotal}`
                await uniFunctions.timeout(1000)
                countdownTotal--
            } else{
                timerDiv.textContent = `GAME START!!!`
                await uniFunctions.timeout(1000)
            }
        }
    }

    async function gameTimer(){
        for (let i = (gameTimeTotal + 2); i > 0; i--){
            if (totalTiles == 0){
                timerDiv.textContent = "CONGRATULATIONS! YOU WIN!"
                uniFunctions.gameEndScreen()
                break
            } else if(gameTimeTotal >= 0){
                timerDiv.textContent = `TIME REMAINING: ${gameTimeTotal}`
                await uniFunctions.timeout(1000)
                gameTimeTotal--
            } else{
                timerDiv.textContent = `GAME OVER! BETTER LUCK NEXT TIME!`
                uniFunctions.gameEndScreen()
            }
        }
    }
    return [await countDown(), gameTimer()]
} //countdown/timer & game status gets appended to the timer on the game board + runs end game code upon player win/loss

function tileFlip(){
    let allTiles = document.querySelectorAll("[class*=tile-]")
    let activeTilesAmount = 0
    let activeTilesList = []
    allTiles.forEach(tile => {
        tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Back-Tile.png`
        tile.classList.add("back-tile")
        tile.addEventListener("click", async function(e){
            let tileSelect = e.target.classList
            for(let i = 0; i < gameTiles.length; i++){
                if(tileSelect.contains(`tile-${gameTiles[i]}`)){
                    tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Front-Tile-${gameTiles[i]}.png`
                    tile.classList.add("flipped")
                    activeTilesAmount++
                    activeTilesList.push(tile)
                    await matchCheck()
                }
            }
        })
    })

    async function matchCheck(){
        if(activeTilesAmount == 2){
            if(activeTilesList[0].src == activeTilesList[1].src){
                await uniFunctions.timeout(350)
                await match()
            } else {
                await uniFunctions.timeout(350)
                await noMatch()
            }
        }
    }
    
    async function match(){
        activeTilesList.forEach(tile => {
            tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Blank-Tile.png`
            tile.removeAttribute("class")
        })
        activeTilesAmount = 0
        activeTilesList = []
        totalTiles -= 2
    }
    
    async function noMatch(){
        activeTilesList.forEach(tile => {
            tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Back-Tile.png`
            tile.classList.remove("flipped")
        })
        activeTilesAmount = 0
        activeTilesList = []
    }
} //logic for tiles being clicked on game board + checking if two tiles clicked match or not