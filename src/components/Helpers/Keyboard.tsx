import { useCallback, useEffect, useState, useContext } from "react";
import { AppContext } from "../../App";
import { BoardService } from "../../services/WordleService/board.service";
import { Key } from "./Key";

export const Keyboard = () => {
    const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

    const { currentAttempt, board, setBoard, setCurrentAttempt, correctWord }: any = useContext(AppContext);
    const [copyOfBoard, setCopyOfBoard] = useState<string[][]>(BoardService.getBoardCopy(board));
    const [keyButton, setKeyBtn] = useState<string>('');

    useEffect(() => {
        const b = BoardService.getBoardCopy(board);
        setCopyOfBoard(b);
    }, [board]);

    const handleKeyboard = useCallback((ev: any) => {
        const currentAttempt = BoardService.getAttempt(null);
        if (ev.key === 'Enter') {
            onEnter(currentAttempt.letterPos, currentAttempt, copyOfBoard);
        } else if (ev.key === 'Backspace') {
            onDelete(currentAttempt.letterPos, copyOfBoard, currentAttempt);
        } else {
            onKey(currentAttempt, ev.key.toUpperCase(), copyOfBoard);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard);
        return () => {
            document.removeEventListener('keydown', handleKeyboard);
        };
    }, [handleKeyboard]);

    const setLetterPos = (direction: string, currentAttempt: any): void => {
        setCurrentAttempt(BoardService.setLetterPos(direction, currentAttempt));
    };

    const selectLetter = (buttonType: string, keyBtn: string) => {

        const { letterPos, attempt } = currentAttempt;
        const newBoard = BoardService.getBoardCopy(board);

        setKeyBtn(keyBtn);

        if (buttonType === 'enter') {
            onEnter(letterPos, currentAttempt, newBoard);

        } else if (buttonType === 'delete') {
            onDelete(letterPos, newBoard, currentAttempt);

        } else {
            onKey(currentAttempt, keyBtn, newBoard);
        }
    };

    const onEnter = (letterPos: number, attempt: any, board: string[][]) => {
        if (letterPos !== 5) return;
        checkWin(letterPos, attempt, board);
        setCurrentAttempt(BoardService.onEnter(attempt));
    };

    const onDelete = (letterPos: number, newBoard: string[][], currentAttempt: any) => {

        if (letterPos === -1) {
            setLetterPos('forward', currentAttempt);
            return;
        }

        newBoard[currentAttempt.attempt][currentAttempt.letterPos] = '';
        const board = BoardService.saveBoard(newBoard);
        setBoard(board);
        setLetterPos('backwards', currentAttempt);
    };

    const onKey = (currentAttempt: any, keyBtn: string, newBoard: string[][]) => {

        if (currentAttempt.letterPos > 4) return;

        newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyBtn;
        const board = BoardService.saveBoard(newBoard);
        setBoard(newBoard);
        setLetterPos('forward', currentAttempt);
    };

    const checkWin = (letterPos: number, attempt: any, board: string[][]) => {
        let currentWord = '';

        for (let i = 0; i < 5; i++) {
            currentWord += board[attempt.attempt][i];
        }
        if (!currentWord === correctWord.toUpperCase()) {
            alert('Word not Found');
        } else {
            alert('CORRECT YOU WON WORDELOS !')
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