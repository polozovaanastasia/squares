var buttonStart = document.querySelector('#start')
var gameArea = document.querySelector('#game')
var timeContent = document.querySelector('#time')
var resultContent = document.querySelector('#result')
var timeHeader = document.querySelector('#time-header')
var resultHeader = document.querySelector('#result-header')
var gameTime = document.querySelector('#game-time')
var boxColors = [
    '#abdce1',
    '#b3abe1',
    '#e5a6e1',
    '#e5a6a6',
    '#ecee77'
]

var score = 0
var isGameStarted = false

buttonStart.addEventListener('click', startGame)
gameArea.addEventListener('click', handleBoxClick)
gameTime.addEventListener('input', setGameTime)

function startGame() {
    score = 0
    setGameTime()
    gameTime.setAttribute('disabled', true)
    timeHeader.classList.remove('hide')
    resultHeader.classList.add('hide')
    isGameStarted = true
    buttonStart.classList.add('hide')
    gameArea.style.backgroundColor = '#fff'

    var interval = setInterval(function(){
        var time = parseFloat(timeContent.textContent)

        if(time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            timeContent.textContent = (time - 0.1).toFixed(1)
        }
    }, 100 )

    renderBox()
}

function setGameScore() {
    resultContent.textContent = score.toString()
}

function setGameTime() {
    var time = +gameTime.value
    timeContent.textContent = time.toFixed(1)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    gameTime.removeAttribute('disabled')
    buttonStart.classList.remove('hide')
    gameArea.innerHTML = ''
    gameArea.style.backgroundColor = '#ccc'
    timeHeader.classList.add('hide')
    resultHeader.classList.remove('hide')
}

function handleBoxClick(event) {
    if(!isGameStarted) {
        return
    }
    if(event.target.dataset.box){
        score++
        renderBox()
    }
}

function renderBox() {
    gameArea.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = gameArea.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize 
    
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getBoxColor()
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', true)

    gameArea.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function getBoxColor() {
    var colorIndex = getRandom(0, boxColors.length)
    return boxColors[colorIndex]
}