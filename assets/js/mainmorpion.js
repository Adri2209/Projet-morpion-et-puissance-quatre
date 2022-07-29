let playerOneSymbol = "X"
let playerTwoSymbol = "O"
let cpuMode = false;
let currentPlayer = playerOneSymbol;
let round = 1
let gameOver = false
let random = 0
const victoryCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
// fonction activation du bouton pour jouer seul ou avec le IA// 
function modeCpu(params) {
   cpuMode = !cpuMode 
   restart()
   if (!cpuMode) {
    document.querySelector('#switchSentence').innerText = "Activer le mode 1 joueur"
   }else{
    document.querySelector('#switchSentence').innerText = "Désactiver le mode 1 joueur"
   }
}
 // Fonction pour afficher le symbol (X ou O) (1ère ETAPE)//
function displaySymbol(element) {
    if (element.innerText == "" && gameOver == false) {
        element.innerText = currentPlayer;
        round++;
        victory()
        setCurrentPlayer()
    }
}
//fonction aleatoire du jeu (IA et le tableau) c'est IA qui reflechi (5ème ETAPE)
function playIa() {
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        random = aleatoire(0, document.querySelectorAll("td").length - 1)
        if ( document.querySelectorAll("td")[random].innerText != "") {
            continue
        }else{
            document.querySelectorAll("td")[random].click()
            break
        }
    }
}
// fonction entre les symbols et les joueurs (chacun son tour) (2ème ETAPE)//
function setCurrentPlayer() {
    if (round % 2 == 0) {
        currentPlayer = playerTwoSymbol;
        if (cpuMode == true) {
               playIa() 
        }
    } else {
        currentPlayer = playerOneSymbol;
    }
}
// Fonction victoire du jeu (3ème ETAPE)//
function victory() {
    for (let i = 0; i < victoryCondition.length; i++) {
        let cell1 = document.querySelectorAll("td")[victoryCondition[i][0]].innerText;
        let cell2 = document.querySelectorAll("td")[victoryCondition[i][1]].innerText;
        let cell3 = document.querySelectorAll("td")[victoryCondition[i][2]].innerText;
        if (cell1 == "" || cell2 == "" || cell3 == "") {
            continue
        }
        if (cell1 == cell2 && cell2 == cell3) {
            if (cell1 == playerOneSymbol) {
                document.querySelector("p").innerText = "Player 1 WINS!!!";
                gameOver = true
                break

            } else if (cell1 == playerTwoSymbol) {
                document.querySelector("p").innerText = "Player 2 WINS!!!";
                gameOver = true
                break
            }
        }
        equality()
    }
}
//Fonction égalité (4ème ETAPE)//
function equality() {
    let count = 0
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        if (document.querySelectorAll("td")[i].innerText != "") {
            count++
        }
    }
    if (count == document.querySelectorAll("td").length) {
        document.querySelector("p").innerText = "EQUALITY !!!";
        gameOver = true
    }
}
// Fonction recommencer (Le petit plus / Dernière ETAPE)//
function restart() {
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        document.querySelectorAll("td")[i].innerText = ""
    }
    document.querySelector("P").innerText = "";
    round = 1
    currentPlayer = playerOneSymbol
    gameOver = false

}

function aleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

