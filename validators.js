function NotEmpty(a, b, c, d) {
    // Função para verificação de combinação de quadrados vazios, return => true/false;

    // Necessário o try, por que na diagonal ele pode tentar pegar um quadrado que não existe,
    // nas pontas, onde não há como formar combinaçoes de 4 quadrados;
    try {
        return (a.childElementCount !== 0 && b.childElementCount !== 0 && c.childElementCount !== 0 && d.childElementCount !== 0)
    } catch {
        return false
    }
}


function Match(a, b, c, d) {
    // Função para comparar se todos os IDs dentro da combinação de quadrados são iguais, return => true/false;
    return (a.id == b.id && a.id == c.id && a.id == d.id)
}


function HorizontalTest() {
    // Array [board], que retorna todas as colunas do tabuleiro;
    const board = document.getElementById('board').children

    // Loop para percorrer todas as colunas de acordo com os indices do Array [board];
    for (let col = 0; col < 6; col++) {

        // Loop para percorrar conjuntos de 4 quadrados em simultâneo, são 4 loops, para as 4 diferentes combinações;
        for (let line = 0; line < 4; line++) {

            // Verificando se alguns dos quadrados está vazio, se não, analisar, se sim, partir para a próxima possível combinação;
            if (NotEmpty(board[line].children[col], board[line+1].children[col], board[line+2].children[col], board[line+3].children[col])) {

                // Verificando com um função externa, se todos os discos dentro dos 4 quadrados são exatamente iguais;
                if (Match(board[line].children[col].lastElementChild, board[line+1].children[col].lastElementChild, 
                    board[line+2].children[col].lastElementChild, board[line+3].children[col].lastElementChild)) {
                        return true
                }
            }
        }
    }
}


function VerticalTest() {
    // Função que analisa todas linhas em conjunto de 4 combinações por vez;
    const board = document.getElementById('board').children
    for (let col = 0; col < 7; col++) {
        for (let line = 0; line < 3; line++) {
            if (NotEmpty(board[col].children[line], board[col].children[line+1], board[col].children[line+2], board[col].children[line+3])) {
                if (Match(board[col].children[line].lastElementChild, board[col].children[line+1].lastElementChild, 
                    board[col].children[line+2].lastElementChild, board[col].children[line+3].lastElementChild)) {
                        return true  
                }
            }
        }
    }
}


function DiagonalTest() {
    const board = document.getElementById('board').children

    //Verificando da esquerda para direita;
    for (let col = 0; col < 4; col++) {
        for (let line = 0; line < 4; line++) {  
            if (NotEmpty(board[line].children[col], board[line+1].children[col+1], board[line+2].children[col+2], board[line+3].children[col+3])) {
                if (Match(board[line].children[col].lastElementChild, board[line+1].children[col+1].lastElementChild, 
                    board[line+2].children[col+2].lastElementChild, board[line+3].children[col+3].lastElementChild)) {
                        return true
                }
            }
        }
    }

    // Verificando da direita para a esquerda;
    for (let col = 0; col < 4; col++) {
        for (let line = 6; line > 2; line--) {
            if (NotEmpty(board[line].children[col], board[line-1].children[col+1], board[line-2].children[col+2], board[line-3].children[col+3])) {
                if (Match(board[line].children[col].lastElementChild, board[line-1].children[col+1].lastElementChild, 
                    board[line-2].children[col+2].lastElementChild, board[line-3].children[col+3].lastElementChild)) {
                        return true
                }
            }
        }
    }
}


function Empate() {
    // Função para determinar se houve empate, Se todos os quadrados estiverem preenchidos(42)
    // e o board não passou em nenhum dos testes de vitória, então determine empate;
    let board = document.getElementById('board').children
    let boardArr = 0
    for (let col = 0; col < 7; col++) {
        for (let line = 0; line < 6; line++) {
            try {
                if (board[col].children[line].childElementCount !== 0) {
                    boardArr++
                } 
            } catch {
                return false
            }
        }
    }
    return (boardArr == 42)
}