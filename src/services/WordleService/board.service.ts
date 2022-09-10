import { storageService } from "../AsyncService/storageService";

export const BoardService = {
    getBoardCopy,
    createBoard,
    setLetterPos,
    onEnter,
    getBoard,
    getAttempt,
    saveBoard
};

type Attempt = { attempt: number, letterPos: number; };
const BOARD_STORAGE_KEY: string = 'boardDB';
const ATTEMPT_STORAGE_KEY: string = 'attemptDB';

function getBoardCopy(board: object) {
    return JSON.parse(JSON.stringify(board));
}

function getBoard() {
    if (!storageService.load(BOARD_STORAGE_KEY)) {
        return createBoard();
    }
    return storageService.load(BOARD_STORAGE_KEY);
}

function createBoard() {
    const board: string[][] = [];
    for (let i = 0; i < 6; i++) {
        const tempB: string[] = [];
        for (let j = 0; j < 5; j++) {
            tempB.push('');
        }
        board.push(tempB);
    }
    storageService.store(BOARD_STORAGE_KEY, board);
    return board;
}

function saveBoard (board: string[][]) {
    storageService.store(BOARD_STORAGE_KEY, board);
    return board
}

function setLetterPos(dir: string, currentAttempt: any): Attempt {
    if (dir === 'forward') {
        const attempt = { ...currentAttempt, letterPos: currentAttempt.letterPos + 1 };
        storageService.store(ATTEMPT_STORAGE_KEY, attempt);
        return attempt;
    }
    
    if (currentAttempt.letterPos === 0) return currentAttempt;
    const attempt = { ...currentAttempt, letterPos: currentAttempt.letterPos - 1 };
    storageService.store(ATTEMPT_STORAGE_KEY, attempt);

    console.log(attempt)
    return attempt;
}

function onEnter(currentAttempt: any): Attempt {
    const attempt = { attempt: currentAttempt.attempt + 1, letterPos: 0 };
    storageService.store(ATTEMPT_STORAGE_KEY, attempt);
    return attempt;
}



function getAttempt(attempt: any): Attempt {
    if (!storageService.load(ATTEMPT_STORAGE_KEY)) {
        storageService.store(ATTEMPT_STORAGE_KEY, attempt);
        return attempt;
    }
    return storageService.load(ATTEMPT_STORAGE_KEY);

}