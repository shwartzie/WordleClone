import { Board } from './Wordle/Board';
import { getTypeOf } from '../Types/Types';
import { BoardService } from '../services/WordleService/board.service';
import { useEffect, useState } from 'react';
export const WordleApp = (p: { board: getTypeOf['Board'], currentAttempt: getTypeOf['Attempt'], correctWord: string; }) => {

    const [stateBoard, setBoard] = useState<getTypeOf['Board']>();
    const [copyBoardState, setCopy] = useState<getTypeOf['Board']>();
    const [stateAttempt, setAttempt] = useState<getTypeOf['Attempt']>();
    const [correctWord, setCorrectWord] = useState<string>();

    const handlePromises = async () => {
        const currBoard = await p.board;
        const currAttempt = await p.currentAttempt;
        const correct = await p.correctWord;
        //inorder to render a board with 6 rows and 5 columns
        const copyBoard: getTypeOf['Board'] = BoardService.getBoardCopy(currBoard);
        if (copyBoard.length > 5) {
            copyBoard.pop();
        }
        //setters
        setBoard(currBoard);
        setCopy(copyBoard);
        setAttempt(currAttempt);
        setCorrectWord(correct);
    };


    useEffect(() => {
        handlePromises();
        console.log('stateBoard', stateBoard);
    }, [p.board]);

    return (
        <section>
            {stateBoard && copyBoardState && stateAttempt && correctWord &&
                <Board
                    board={stateBoard} copyBoard={copyBoardState}
                    currentAttempt={stateAttempt} correctWord={correctWord}
                />}
        </section>
    );
};