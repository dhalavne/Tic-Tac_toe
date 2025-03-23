const board = function() {
    const boardArray = [null,null,null,null,null,null,null,null,null];

    const getArray = () => boardArray;

    return { getArray };
}();


function player(name, type) {
    this.name  = name;
    this.str = type;

    return { name, type };
}

function isString(val) {
    return (typeof val) == "string";
}

function game() {
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

    const fillVal = (pos, char) => {
        let val = board.getArray()[pos];
        if (val == null) {
         board.getArray()[pos] = char;
       }
    }

    const player1 = player("Avi", "O");
    const player2 = player("Comp", "X");
    
    const tryPos = (pos, char) => {
        fillVal(pos, char);
        if (isSeqComplete()) {
            if (player1.type == char) {
                console.log(player1.name + " wins the game" );
            } else {
                console.log(player2.name + " wins the game");
            }
        } else {
            const arr = board.getArray();
            if (arr.every(isString)) {
                console.log("Game Over !!!");
            }
        }
    }

    return { tryPos, isSeqComplete };
}




