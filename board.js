const board = function() {
    const boardArray = [null,null,null,null,null,null,null,null,null];

    const getArray = () => boardArray;

    return { getArray };
}();


function player(type) {
    this.str = type;
    let score = 0;
    let playerName;

    const setName = (name) => {
        playerName = name;
    }

    const incrementScore = () => {
        score += 1;
    }

    const resetScore = () => {
        score = 0;
    }


    return { type, getScore : () => score, incrementScore, setName, getName: () => playerName, resetScore};
}

function isString(val) {
    return (typeof val) == "string";
}

function game() {
    let isPlayerOneTurn = true;
    let isGameFinished = false;
    let isGameStarted = false;
    const isSeqComplete = () => {
        const val0 = board.getArray()[0];
        const val1 = board.getArray()[1];
        const val2 = board.getArray()[2];
        const val3 = board.getArray()[3];
        const val4 = board.getArray()[4];
        const val5 = board.getArray()[5];
        const val6 = board.getArray()[6];
        const val7 = board.getArray()[7];
        const val8 = board.getArray()[8];

        if (val0) {
            if ((val0 == val1 && val1 == val2) || (val0 == val3 && val3 == val6) || (val0 == val4 && val4 == val8)) {
                return true;
            }
        }
        if (val4) {
            if ((val3 == val4 && val4 == val5) || (val1 == val4 && val4 == val7) || (val2 == val4 && val4 == val6)) {
                return true;
            }
        }
        if (val8) {
            if ((val6 == val7 && val7 == val8) || (val2 == val5 && val5 == val8)) {
                return true;
            }
        }

        return false;
    }
    
    const tryPos = (obj, char) => {
        const id = obj["id"];
        
        let val = board.getArray()[Number(id)];
        if (val == null) {
            isPlayerOneTurn = !isPlayerOneTurn;
            board.getArray()[id] = char;
            return true;
        }
        return false;
    }

    const setGameFinished = (value) => {
        isGameFinished = value;
    }

    const beginGame = () => {
        isGameStarted = true;
    }

    const restartGame = () => {
        if (isGameStarted) {
        const arr = board.getArray();
        for (let i = 0; i < 9; i++) {
            arr[i] = null;
        }
        setGameFinished(false);
        isGameStarted = true;
    }
    }

    const resetGame = () => {
        if (isGameStarted || isGameFinished) {
        restartGame();
        player1.resetScore();
        player2.resetScore();
        }
    }

    return { tryPos, isSeqComplete, getTurn : () => isPlayerOneTurn, setGameFinished, getGameFinished : () => isGameFinished, resetGame,
        getGameStarted: () => isGameStarted, beginGame, restartGame };
}

    
const mainpulateDom = function() {
    const obj1 = document.getElementById("0");
    const obj2 = document.getElementById("1");
    const obj3 = document.getElementById("2");
    const obj4 = document.getElementById("3");
    const obj5 = document.getElementById("4");
    const obj6 = document.getElementById("5");
    const obj7 = document.getElementById("6");
    const obj8 = document.getElementById("7");
    const obj9 = document.getElementById("8");

    const addEventListeners = () => {
        
        obj1.addEventListener("click", function() {
            fillNode(obj1);
        });
        

        obj2.addEventListener("click", function() {
            fillNode(obj2);
        });
        
        obj3.addEventListener("click", function() {
            fillNode(obj3);
        });
        
        obj4.addEventListener("click", function() {
            fillNode(obj4);
        });
        
        obj5.addEventListener("click", function() {
            fillNode(obj5);
        });
        
        obj6.addEventListener("click", function() {
            fillNode(obj6);
        });
        
        obj7.addEventListener("click", function() {
            fillNode(obj7);
        });
        
        obj8.addEventListener("click", function() {
            fillNode(obj8);
        });
        
        obj9.addEventListener("click", function() {
            fillNode(obj9);
        });

        const resetButton = document.getElementById("resetButton");
        resetButton.addEventListener("click", g.resetGame);
        resetButton.addEventListener("click", resetDom);
        const restartButton = document.getElementById("restartButton");
        restartButton.addEventListener("click", g.restartGame);
        restartButton.addEventListener("click", restartDom);
        const begin = document.getElementById("begin");
        begin.addEventListener("click", function() {
            const player1 = document.getElementById("player1").value;
            const player2 = document.getElementById("player2").value;
            beginGame(player1,player2);
        });
    }

    const beginGame = (player1Name, player2Name) => {
        if (player1Name == "" || player2Name == "") {
            const para = document.getElementById("fillNames");
            para.innerHTML = "Please fill in the names of both the players";
        } else {
            g.beginGame();
            setUpScoreDisplay(player1Name, player2Name);
            player1.setName(player1Name);
            player2.setName(player2Name);
            const divNames = document.getElementById("getNames");
            divNames.innerHTML = null;
        }
    }

    const setUpScoreDisplay = (player1Name, player2Name) => {
        const scoresDiv = document.getElementById("scores");
        scoresDiv.style = "margin: 0 20vw";

        const playersDiv = document.createElement("div");
        playersDiv.setAttribute("id","playersDiv");
        
        playersDiv.innerHTML = "<span><label id='name1'>"+player1Name+" : </label>" +
        "<span id='player1Score'>"+player1.getScore()+"</span></span>" +
        "<span><label id='name2'>"+player2Name+" : </label>" +
        "<span id='player2Score'>"+player2.getScore()+"</span></span>"

        playersDiv.style = "width: 40vw; display: flex; justify-items: space-between;";
        
        
        scoresDiv.appendChild(playersDiv);
        styleFontSize('name1');
        styleFontSize('name2');
        styleScores('player1Score');
        styleScores('player2Score');

    }

    const styleFontSize = (id) => {
        const element = document.getElementById(id);
        element.style.fontSize = "28px";
    }

    const styleScores = (id) => {
        const elem = document.getElementById(id);
        elem.style = "font-size: 28px; padding: 15px; border: 2px solid grey; border-radius: 4px";
    }

    const resetNodes = () => {
        obj1.innerHTML = null;
        obj2.innerHTML = null;
        obj3.innerHTML = null;
        obj4.innerHTML = null;
        obj5.innerHTML = null;
        obj6.innerHTML = null;
        obj7.innerHTML = null;
        obj8.innerHTML = null;
        obj9.innerHTML = null;

        const resElement = document.getElementById("result");
        resElement.innerHTML = null;
    }

    const resetDom = () => {
        if (g.getGameStarted() || g.getGameFinished()) {
            resetNodes();
            resetDomScores();
            resetResult(); 
        }
    }

    const restartDom = () => {
        if (g.getGameStarted()) {
            resetDom();
            resetResult();
        }
    }

    const resetResult = () => {
        const resElement = document.getElementById("result");
        resElement.innerHTML = null;
    }

    const resetDomScores = () => {
        let scoreObj;
        let playerObj;
        scoreObj = document.getElementById("player1Score");
        playerObj = player1;
        displayUpdatedScore(scoreObj, playerObj);
        scoreObj = document.getElementById("player2Score");
        playerObj = player2;
        displayUpdatedScore(scoreObj, playerObj);
    }

    const displayResult = (char) => {
        const resElement = document.getElementById("result");
        let name;
        let scoreObj;
        let playerObj;
        if (player1.type == char) {
            name = player1.getName();
            player1.incrementScore();
            scoreObj = document.getElementById("player1Score");
            playerObj = player1;
        } else {
            name = player2.getName();
            player2.incrementScore();
            scoreObj = document.getElementById("player2Score");
            playerObj = player2;
        }

        displayUpdatedScore(scoreObj, playerObj);
        
        resElement.innerHTML = name + " wins the game";
    }

    const displayUpdatedScore = (obj, playerObj) => {
        obj.innerHTML = playerObj.getScore();
    }

    const fillNode = (obj) => {
        let char;
        if (g.getGameStarted() && !g.getGameFinished()) {
        if (g.getTurn()) {
            char = "X";
        } else {
            char = "O";
        }
        if (g.tryPos(obj, char)) {
            obj.innerHTML = char;  
        } 
        if (g.isSeqComplete()) {
            displayResult(char);
            g.setGameFinished(true);
        }
    }
    }

    return { addEventListeners };
}();

const g = game();

const player1 = player("O");
const player2 = player("X");

mainpulateDom.addEventListeners();





