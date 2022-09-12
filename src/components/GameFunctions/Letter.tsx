import { useContext } from "react";
import { AppContext } from "../../App";
import { GameService } from "../../services/WordleService/game.service";
import { getTypeOf } from "../../Types/Types";
export const Letter = (
    p: { letterPos: number, attemptVal: number, board: getTypeOf['Board'], correctWord: string, currentAttempt: getTypeOf['Attempt'] }
) => {
    const letter: string = p.board[p.attemptVal][p.letterPos];

    //setting letter status
    const correctWord: string = p.correctWord;
    const correct = correctWord[p.letterPos] === letter;
    const almostCorrect = !!(!correct && letter !== '' && correctWord.includes(letter));
    let letterState: string = '';
    
    if (correct && p.currentAttempt.attempt > p.attemptVal) {
        letterState = 'correct';
    } else if (almostCorrect) {
        letterState = 'almost';
    } else {
        letterState = 'error';
    }

    return <p className={`letter ${letterState}`} >{letter}</p>;
};