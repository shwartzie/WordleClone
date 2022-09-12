import React from "react";

export type getTypeOf = {
    Attempt: { attempt: number, letterPos: number },
    GameOver: { isGameOver: boolean, isGuessedWord: boolean },
    Board: string[][]
};

export type BoardCmpTypes = {
    board: getTypeOf['Board'],
    copyBoard: getTypeOf['Board'],
    currentAttempt: getTypeOf['Attempt'],
    correctWord: string ,
}

