import NumberedGamePiece from "./GamePieces/NumberedGamePiece.js";
import EmptyGamePiece from "./GamePieces/EmptyGamePiece.js";

const size = 3;

export default class Board {
    constructor() {
        this.Size = size;

        // TODO model array holder
        this.Board = new Array(size * size);
        this.ResetGame();
    }

    ResetGame() {
        for (let i = 0; i < size * size - 1; i++) {
            this.Board[i] = new NumberedGamePiece(i);
        }
        this.Board[size * size - 1] = new EmptyGamePiece();
        do {
            shuffleArray(this.Board);
        } while (!this.isBoardSolvable());
    }

    TrySwapIndexes(index1, index2) {
        if (!(this.CheckIfEmpty(index1) || this.CheckIfEmpty(index2))) {
            return false;
        }
        [this.Board[index1], this.Board[index2]] = [
            this.Board[index2],
            this.Board[index1],
        ];
    }

    CheckIfEmpty(index) {
        return this.Board[index].value === "empty";
    }

    // TODO maybe inject this?
    isBoardSolvable() {
        let ReversedSize = 0;
        for (let i = 0; i < this.Board.length - 1; i++) {
            if (!(this.Board[i] instanceof NumberedGamePiece)) continue;
            for (let j = i + 1; j < this.Board.length - 1; j++) {
                if (!(this.Board[j] instanceof NumberedGamePiece)) continue;
                if (this.Board[i].Value > this.Board[j].Value)
                    ReversedSize += this.Board[j].Value;
            }
        }
        if (this.Size % 2 == 1) {
            return ReversedSize % 2 == 0;
        } else {
            let emptySpaceIndex =
                this.Board.findIndex((elem) => elem instanceof EmptyGamePiece) +
                1;
            return (ReversedSize + emptySpaceIndex) % 2 == 0;
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
