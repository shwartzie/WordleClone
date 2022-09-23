import { useCallback, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { BoardService } from "../../services/WordleService/board.service";
import { Key } from "./Key";
import { getTypeOf } from "../../Types/Types";
import { GameService } from "../../services/WordleService/game.service";
import { BoardCmpTypes } from "../../Types/Types";

export const Keyboard = (p: BoardCmpTypes) => {
    const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

    const { setBoard, setCurrentAttempt, gameOver, setGameOver }: any = useContext(AppContext);

    const handleKeyboard = useCallback((ev: any) => {
        const currentAttempt = GameService.getAttempt(null);
        if (ev.key === 'Enter') {
            onEnter(currentAttempt.letterPos, currentAttempt, p.copyBoard);
        } else if (ev.key === 'Backspace') {
            onDelete(currentAttempt.letterPos, p.copyBoard, currentAttempt);
        } else {
            onKey(currentAttempt, ev.key.toUpperCase(), p.copyBoard);
        }
    }, []);

    useEffect(() => {
        if (gameOver.isGameOver) return;
        if (p.copyBoard) {
            document.addEventListener('keydown', handleKeyboard);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyboard);
        };
    }, [handleKeyboard]);

    const setLetterPos = (direction: string, currentAttempt: any): void => {
        setCurrentAttempt(GameService.setLetterPos(direction, currentAttempt));
    };

    const selectLetter = async (buttonType: string, keyBtn: string) => {
        if (gameOver.isGameOver) return;
        const { letterPos, attempt } = p.currentAttempt;
        const newBoard = await BoardService.getBoardCopy(p.board);


        if (buttonType === 'enter') {
            onEnter(letterPos, p.currentAttempt, newBoard);

        } else if (buttonType === 'delete') {
            onDelete(letterPos, newBoard, p.currentAttempt);

        } else {
            onKey(p.currentAttempt, keyBtn, newBoard);
        }
    };

    const onEnter = (letterPos: number, attempt: any, board: getTypeOf['Board']) => {
        if (gameOver.isGameOver || letterPos !== 5) return;
        checkWin(letterPos, attempt, board);
        setCurrentAttempt(GameService.onEnter(attempt));
    };

    const onDelete = (letterPos: number, newBoard: getTypeOf['Board'], currentAttempt: any) => {
        if (gameOver.isGameOver) return;
        if (letterPos === -1) {
            setLetterPos('forward', currentAttempt);
            return;
        }

        newBoard[currentAttempt.attempt][currentAttempt.letterPos] = '';
        const board = BoardService.saveBoard(newBoard);
        setBoard(Promise.resolve(board));
        setLetterPos('backwards', currentAttempt);
    };

    const onKey = async (currentAttempt: any, keyBtn: string, newBoard: getTypeOf['Board']) => {
        if (gameOver.isGameOver) return;
        if (currentAttempt.letterPos > 4) return;
        newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyBtn;
        const board = await BoardService.saveBoard(newBoard);

        setBoard(Promise.resolve(board));
        setLetterPos('forward', currentAttempt);
    };

    const checkWin = (letterPos: number, attempt: any, board: getTypeOf['Board']) => {
        let currentWord = '';

        for (let i = 0; i < 5; i++) {
            currentWord += board[attempt.attempt][i];
        }

        if (currentWord !== p.correctWord.toUpperCase()) {
            alert('Word not Found');
        } else {
            setGameOver({ isGameOver: true, guessedWord: true });
            alert('CORRECT YOU WON WORDELOS !');
        }
    };

    return (
        <div className="keyboard">
            <div className="keyboard-key-container">
                {keys1.map((key) => (
                    <div className="key" key={key}><Key buttonType={'key'} keyBtn={key} selectLetter={selectLetter} /></div>
                ))}
            </div>
            <div className="keyboard-key-container">
                {keys2.map((key) => (
                    <div className="key" key={key}><Key buttonType={'key'} keyBtn={key} selectLetter={selectLetter} /></div>
                ))}
            </div>
            <div className="keyboard-key-container">
                <div className="key flex-1">
                    <Key buttonType={'enter'} keyBtn={'ENTER'} selectLetter={selectLetter} />
                </div>
                {keys3.map((key) => (
                    <div className="key" key={key}><Key buttonType={'key'} keyBtn={key} selectLetter={selectLetter} /></div>
                ))}
                <div className="key flex-1">
                    <Key buttonType={'delete'} keyBtn={'DELETE'} selectLetter={selectLetter} />
                </div>
            </div>
        </div>
    );
};