// Variaveis Globais
let boardEvent = document.getElementById('board') // Representa o tabuleiro;
let square = document.getElementById('square') // Representa o qudrado no tabuleiro;
let discos = document.getElementById('discos') // Representa a área onde fica os discos;
let contador = 1 // Para alternar os jogadores;
let next // Para informar o próximo disco a ser criado;

var jogador1 = '';
var jogador2 = '';
let imagem1 = "url('./img/disco1blue.png')"
let imagem2 = "url('./img/disco1red.png')"

let winPlay1 = 0
let winPlay2 = 0
let draw = 0

let theme = new Audio()
theme.src = "sounds/theme.wav"
theme.volume = 0.005
theme.loop = true

let winSong = new Audio()
winSong.src = "sounds/taDa.mp3"
winSong.volume = 0.02

let drawSong = new Audio()
drawSong.src = "sounds/error.wav"


function getPlayerName() { 
    // Função para pegar o nome do jogador
    jogador1 = document.getElementById('inputPlayer1').value;
    jogador2 = document.getElementById('inputPlayer2').value;

    if (jogador1 == '') {
        jogador1 = 'JOGADOR 1'
    } else {
        let playerName1 = document.getElementById('player1')
        playerName1.textContent = jogador1
    }
    if (jogador2 == '') {

        jogador2 = 'JOGADOR 2'
    } else {
        let playerName2 = document.getElementById('player2')
        playerName2.textContent = jogador2
    }
}

function ShowPlayer() { 
    // Função para selecionar de qual jogador é a vez
    let playerTurn = document.getElementById('PlayerAtual');
    playerTurn.innerHTML = `&lt;&lt;&lt; ${jogador1}`;
    if (contador % 2 == 1) {
        playerTurn.innerHTML = `&lt;&lt;&lt; ${jogador1}`;
    } else {
        playerTurn.innerHTML = `&lt;&lt;&lt; ${jogador2}`;
    }
}


function createBoard() { // Função que cria o board
    const board = document.getElementById('board')

    // Primeiro loop, para criar as 7 colunas;
    for (let i = 1; i <= 7; i++) {
        let line = document.createElement('div')
        line.id = `column${i}`
        line.className = 'column'
        line.setAttribute("onmousedown", "select.play()")
        board.appendChild(line)

        // Segundo loop, para criar 6 quadrados  da coluna
        for (let start = 1; start <= 6; start++) {
            let line = document.getElementById(`column${i}`)
            let square = document.createElement('div')
            square.id = 'square'
            line.appendChild(square)
        }
    }
}

function AdicionarDisco(player, column) { 
    //  Função que adiciona disco na coluna
    // player == disco atual selecionado; EX: 'disc1'
    // column == onde o disco está no tabuleiro; EX: 'column1'
    // Essa função só pode ser chamada se há espaço vazio na coluna especificada;

    const disco = document.getElementById(player)
    const ColumnArr = document.getElementById(column).children

    for (square of ColumnArr) {

        // Se o quadrado estiver vazio, adicione ele,  verifique se ganhou e pare o loop, se não,
        // continue o loop até achar o quadrado dentro da coluna especificada vazio.
        if (square.childElementCount == 0) {
            if (contador % 2 === 0) {
                square.appendChild(disco)
            } else {
                square.appendChild(disco)
            }
            break
        }
    }
}


window.onload = () => {
    personalizarDisco()
    // Criação do tabuleiro, com divs column e divs square;
    createBoard()

    // Evento para gerenciar qual o próximo jogador, qual coluna selecionada, e verificando se a coluna está cheia;
    boardEvent.addEventListener('click', JogarDisco)
        // Evento para gerenciar em qual coluna o mouse está encima, e mover o disco para esta coluna
    boardEvent.addEventListener('mouseover', MoverDisco)
}

function personalizarDisco() {
    var discosp1 = document.getElementById("discosPlayer1");
    var discosp2 = document.getElementById("discosPlayer2");

    discosp1.addEventListener('click',  AddImage1)
    discosp2.addEventListener('click', AddImage2)
}

function AddImage1() {
    if (event.target.id != "discosPlayer1" ) {
        imagem1 = `url(./img/${event.target.id}.png)`
    }
}

function AddImage2() {
    if (event.target.id != "discosPlayer2" ) {
        imagem2 = `url(./img/${event.target.id}.png)`
    }
}

function JogarDisco(event) {
    let column = event.target.id
        // Verificando, o último elemento da coluna está vazio? se sim, ainda da pra adicionar;
        // E se o usuario clicar fora da area da coluna(borda), o evento nao pode ser board, e sim a column;
    if (event.target.children[5].childElementCount != 1 && column !== 'board') {

        // Alternando os jogadores
        contador++
        if (contador % 2 === 0) {
            disco = 'disc1'
            next = 'disc2'
        } else if (contador % 2 === 1) {
            disco = 'disc2'
            next = 'disc1'
        }
        // Atribuido um dataset ao board, para identificar globalmente, o proximo disco(jogador).
        boardEvent.dataset.value = next

        // Removendo a animação do onhover, para resolver bugs;
        let discoS = document.getElementById(disco)
        discoS.className = ""

        // Adicionando o disco ao quadrado na coluna especificada;
        AdicionarDisco(disco, column)
        ShowPlayer();

        // Aqui é chamado todos os testes para verificar se o usuário formou
        // uma combinação de vitória, qualquer que retornar true, ele venceu.
        if (HorizontalTest() | VerticalTest() | DiagonalTest()) {
            winSong.play()
            StopTimer()
            if (contador % 2 === 0) {
                boardEvent.removeEventListener('click', JogarDisco)
                boardEvent.removeEventListener('mouseover', MoverDisco)
                // let winnerScreen = document.getElementById('WinScreen')
                // let winTitle = document.getElementById('title')
                // winnerScreen.style.display = 'block'
                winScreen(jogador1)
                // winTitle.innerHTML = `${jogador1} <br> VENCEU!`
                console.log(`VITÓRIA DO JOGADOR ${jogador1.toUpperCase()}`)
            } else {
                boardEvent.removeEventListener('click', JogarDisco)
                boardEvent.removeEventListener('mouseover', MoverDisco)
                // let winnerScreen = document.getElementById('WinScreen')
                // let winTitle = document.getElementById('title')
                // winnerScreen.style.display = 'block'
                winScreen(jogador2)
                // winTitle.innerHTML = `${jogador2} <br> VENCEU!`
                console.log(`VITÓRIA DO JOGADOR ${jogador2.toUpperCase()}`)
            }

        } else if (Empate()) {
            drawSong.play()
            boardEvent.removeEventListener('click', JogarDisco)
            boardEvent.removeEventListener('mouseover', MoverDisco)
            StopTimer()
            disco = ''
            DrawScreen()
            console.log('Empate')

        } else {
            // Adicionando um novo disco
            newDisk();
            // let NewDisco = document.createElement('div')
            // NewDisco.id = next
            // discos.appendChild(NewDisco)
        }
    }
}


function MoverDisco() {
    // Função para movimentar disco entre as colunas, 
    // enquanto o usuario percorre as colunas com o ponteiro do mouse;
    let discValue = 'disc1'
    if (boardEvent.dataset.value !== undefined) {
        discValue = boardEvent.dataset.value
    }
    // aplica uma classe do css, para movimentar com translate;
    // depois é removida para nao influênciar no disco no board.
    disco = document.getElementById(discValue)
        switch (event.target.id) {
            case 'column1':
                disco.className = 'onHover1'
                break
            case 'column2':
                disco.className = 'onHover2'
                break
            case 'column3':
                disco.className = 'onHover3'
                break
            case 'column4':
                disco.className = 'onHover4'
                break
            case 'column5':
                disco.className = 'onHover5'
                break
            case 'column6':
                disco.className = 'onHover6'
                break
            case 'column7':
                disco.className = 'onHover7'
                break
        }
}


var button = document.getElementById("buttonStart");
button.onclick = function() {
    theme.play()
    let discoA = document.getElementById('disc1')
    discoA.style.backgroundImage = imagem1
    var discosp1 = document.getElementById("discosPlayer1");
    var discosp2 = document.getElementById("discosPlayer2");
    discosp1.removeEventListener('click',  AddImage1)
    discosp2.removeEventListener('click', AddImage2)
    document.getElementById("StartScreen").style.display = "none";
    tempo(); //ao clicar no button começa a contar o tempo;
    getPlayerName();
    ShowPlayer()
}



function timerReset() { 
    // Reinicia o timer do zero
    let timerRes = document.getElementById("digits");
    StopTimer();
    timerRes.textContent = "00:00:00";
    tempo();
}

function resetGame() { 
    //Limpa o board e cria outro zerado
    let UpdateScreen = document.getElementById('UpdateScreen')
    UpdateScreen.textContent = ''
    let deletar = document.getElementById('board');
    deletar.innerHTML = '';
    boardEvent.dataset.value = 'disc1'
    disco = 'disc1'
    next = 'disc1'
    contador = 1
    discos.textContent = ''
    createBoard();
    timerReset();
    newDisk()
    boardEvent.addEventListener('click', JogarDisco)
    boardEvent.addEventListener('mouseover', MoverDisco)
    
}

function newDisk() {
    if (next == 'disc1') {
        let NewDisco = document.createElement('div')
        NewDisco.id = next
        NewDisco.style.backgroundImage = imagem1
        discos.appendChild(NewDisco)
    } else if (next == 'disc2') {
        let NewDisco = document.createElement('div')
        NewDisco.id = next
        NewDisco.style.backgroundImage = imagem2
        discos.appendChild(NewDisco)
    }
}

function newGame() {

    location.reload()
}


function continueGame() {
    let playerTurn = document.getElementById('PlayerAtual');
    if (disco == 'disc1') {
        playerTurn.innerHTML = `&lt;&lt;&lt; ${jogador1}`;
        winPlay1++
        let Play1Score = document.getElementById('score1')
        Play1Score.textContent = (String(winPlay1).padStart(2, '0'))
    } else if (disco == 'disc2') {
        playerTurn.innerHTML = `&lt;&lt;&lt; ${jogador1}`;
        winPlay2++
        let Play2Score = document.getElementById('score2')
        Play2Score.textContent = (String(winPlay2).padStart(2, '0'))
    } else {
        draw++
        let drawArea = document.getElementById('draw_score')
        drawArea.textContent = (String(draw).padStart(2, '0'))
    }

    resetGame()
}

