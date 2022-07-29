let playerOneSymbol ='<span id="moncercleun">J1</span>'
let playerTwoSymbol ='<span id="moncercledeux">J2</span>'
let cpuMode = false;
let currentPlayer = playerOneSymbol;
let round = 1;
let gameOver = false;
let random = 0
let gridGravity = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41]

]
const winningCondition = [
    //les victoires orizontales
    [0, 1, 2, 3],[1, 2, 3, 4],[2 ,3, 4, 5],[3, 4, 5, 6],
    [7, 8, 9, 10],[8, 9, 10, 11],[9, 10, 11, 12],[10, 11, 12, 13],
    [14, 15, 16, 17],[15, 16, 17, 18],[16, 17, 18, 19],[17, 18, 19, 20],
    [21, 22, 23, 24],[22, 23, 24, 25],[23, 24, 25, 26],[24, 25, 26, 27],
    [28, 29, 30, 31],[29, 30, 31, 32],[30, 31, 32, 33],[31, 32, 33, 34],
    [35, 36, 37, 38],[36, 37, 38, 39],[37, 38, 39, 40],[38, 39, 40, 41],
    //les victoires verticales
    [0,7,14,21],[7,14,21,28],[14,21,28,35],
    [1,8,15,22],[8,15,22,29],[15,22,29,36],
    [2,9,16,23],[9,16,23,30],[16,23,30,37],
    [3,10,17,24],[10,17,24,31],[17,24,31,38],
    [4,11,18,25],[11,18,25,32],[18,25,32,39],
    [5,12,19,26],[12,19,26,33],[19,26,33,40],
    [6,13,20,27],[13,20,27,34],[20,27,34,41],
    //les victoires diagonales haut -> droite
    [0,8,16,24],[1,9,17,25],[2,10,18,26],[3,11,19,27],
    [7,15,23,31],[8,16,24,32],[9,17,25,33],[10,18,26,34],
    [14,22,30,38],[15,23,31,39],[16,24,32,40],[17,25,33,41],
    //les victoires diagonales haut -> gauche
    [6,12,18,24],[5,11,17,23],[4,10,16,22],[3,9,15,21],
    [13,19,25,31],[12,18,24,30],[11,17,23,29],[10,16,22,28],
    [20,26,32,38],[19,25,31,37],[18,24,30,36],[17,23,29,35]
]
// Function activation boutton pour jouer seul ou avec IA //

function modeCpu() {
    cpuMode = !cpuMode
   restart()
    if(!cpuMode){
        document.querySelector("#switchSentence").innerText = "ACTIVER J1"
    }else{
        document.querySelector("#switchSentance").innerText = "DESACTIVER J1"
   }
}

// Fonction pour afficher le symbol (J1 ou J2) (Première ETAPE)//

function displaySymbol(element) {
    element = gravity(element)
    if (element.innerHTML == "" && gameOver == false) {
        element.innerHTML = currentPlayer
        round ++
        victory()
        setCurrentPlayer()
    }
}
// Fonction aleatoire du jeu (IA + Tableau) (Cinquième étape) //

function playIA() {
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        random = aleatoire(0, document.querySelectorAll("td").length -1)
       if(document.querySelectorAll("td")[random].innerText != ""){
           continue
        }else{
            document.querySelectorAll("td")[random].click()
            break
       } 
  }
}
// Fonction jeu symbol et joueurs (Deuxième ETAPE) //

function setCurrentPlayer() {
    if (round % 2 == 0) {
       currentPlayer = playerTwoSymbol;
       if (cpuMode == true) {
        playIA()
       }
    }else{
        currentPlayer = playerOneSymbol;
    }
}
// Fonction victoire du jeu (Troisième ETAPE) //

function victory() {
    for (let i = 0; i < winningCondition.length; i++) {
     let cell1 = document.querySelectorAll("td")[winningCondition[i][0]].innerHTML; 
     let cell2 = document.querySelectorAll("td")[winningCondition[i][1]].innerHTML; 
     let cell3 = document.querySelectorAll("td")[winningCondition[i][2]].innerHTML;   
     let cell4 = document.querySelectorAll("td")[winningCondition[i][3]].innerHTML; 
     if (cell1 =="" || cell2 =="" || cell3 =="" || cell4 == "") {
        continue
     }

    if (cell1 == cell2 && cell2 == cell3 && cell3 == cell4) {
    if (cell1 == playerOneSymbol) {
        document.querySelector("p").innerHTML = "PLAYER J1 GAGNANT !!!";
        gameOver = true
        break

    }else if (cell1 == playerTwoSymbol){
        document.querySelector("p").innerHTML = "PLAYER J2 GAGNANT !!!";
        gameOver = true
        break
    }
}
equality()
}
}
// Fonction égalité (Quatrième étape) //

function equality() {
    let count = 0
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        if (document.querySelectorAll("td")[i].innerText != ""){
        count ++
   }
    }
   if (count == document.querySelectorAll("td").length){
        document.querySelector("p").innerText = "EQUALITY";
        gameOver = true
    }
}
//Function recommencer le jeu //

function restart() {
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        document.querySelectorAll("td")[i].innerText = ""
    }
    document.querySelector("p").innerText = "";
    round = 1
    currentPlayer = playerOneSymbol
    gameOver = false
}

    //Fonction gravité //


function gravity(child){
    let result
    let parent = child.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, child);
      for (let i = gridGravity.length - 1; i => 0; i--){
        result = document.querySelectorAll('td')[gridGravity[i][index]];
        if(result.innerHTML != ""){
          continue;
        }
        break;
      }
    return result;
}


function aleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

