
function tempo() { 
    // Função para gerenciamento do timer do jogo;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    window.timer = setInterval(function() {
        if (minutes == 59 && seconds == 59) {
            hours++;
            minutes = 0;
            seconds = 0;
        } else if (seconds == 59) {
            minutes++;
            seconds = 0;
        } else { seconds++; }

        let timerId = document.getElementById("digits");
        timerId.textContent = (String(hours).padStart(2, '0')) + ":" + (String(minutes).padStart(2, '0')) + ":" + (String(seconds).padStart(2, '0'));
    }, 1000)
}

function StopTimer() {
    // Função para parar o timer, caso alguêm vença, empate, ou de restart.
    clearInterval(timer)
}


function winScreen(jogador) {
    let UpdateScreen = document.getElementById('UpdateScreen')

    let main = document.createElement('div')
    main.id = 'WinScreen'

    let gif = document.createElement('img')
    gif.src = "win.gif"
    main.appendChild(gif)

    let title = document.createElement('p')
    title.id = 'title'
    title.innerHTML = `${jogador} <br> VENCEU!`
    main.appendChild(title)

    let newGameBtn = document.createElement('div')
    newGameBtn.id = 'newgame'
    newGameBtn.setAttribute("onclick", "newGame()")
    newGameBtn.setAttribute("onmousedown", "select.play()")
    let newGtext = document.createElement('p')
    newGtext.textContent = '  New Game '
    newGameBtn.appendChild(newGtext)
    main.appendChild(newGameBtn)

    let ContinueBtn = document.createElement('div')
    ContinueBtn.id = 'continue'
    ContinueBtn.setAttribute("onclick", "continueGame()")
    ContinueBtn.setAttribute("onmousedown", "select.play()")
    let continueText = document.createElement('p')
    continueText.textContent = ' Continue? '
    ContinueBtn.appendChild(continueText)
    main.appendChild(ContinueBtn)

    UpdateScreen.appendChild(main)

}

function DrawScreen() {
    let UpdateScreen = document.getElementById('UpdateScreen')

    let main = document.createElement('div')
    main.id = 'DrawScreen'

    let gif = document.createElement('img')
    gif.src = "gameover.gif"
    main.appendChild(gif)

    let title = document.createElement('p')
    title.id = 'title'
    title.innerHTML = 'EMPATE!!!'   
    main.appendChild(title)

    let newGameBtn = document.createElement('div')
    newGameBtn.id = 'newgame'
    newGameBtn.setAttribute("onclick", "newGame()")
    let newGtext = document.createElement('p')
    newGtext.textContent = '  New Game '
    newGameBtn.appendChild(newGtext)
    main.appendChild(newGameBtn)

    let ContinueBtn = document.createElement('div')
    ContinueBtn.id = 'continue'
    ContinueBtn.setAttribute("onclick", "continueGame()")
    let continueText = document.createElement('p')
    continueText.textContent = ' Continue? '
    ContinueBtn.appendChild(continueText)
    main.appendChild(ContinueBtn)

    UpdateScreen.appendChild(main)
}