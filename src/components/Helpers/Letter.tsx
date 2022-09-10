import { useContext } from "react";
import { AppContext } from "../../App";
import { GameService } from "../../services/WordleService/game.service";
export const Letter = (p: { letterPos: number, attemptVal: number; }) => {
    const context: any = useContext(AppContext);
    const letter: string = context.board[p.attemptVal][p.letterPos];

    //setting letter status
    const correctWord = GameService.setDummyCorrectAnswer();
    const correct = correctWord[p.letterPos] === letter;
    const almostCorrect = !!(!correct && letter !== '' && correctWord.includes(letter));
    let letterState: string = '';
    if (correct && context.currentAttempt.attempt > p.attemptVal) {
        letterState = 'correct';
    } else if (almostCorrect) {
        letterState = 'almost';
    } else {
        letterState = 'error';
    }

    return <p className={`letter ${letterState}`} >{letter}</p>;
};