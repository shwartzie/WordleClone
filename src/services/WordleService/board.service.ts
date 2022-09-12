import { storageService } from "../AsyncService/storageService";
import { getTypeOf } from "../../Types/Types";
export const BoardService = {
    getBoardCopy,
    createBoard,
    getBoard,
    saveBoard
};

const BOARD_STORAGE_KEY: string = 'boardDB';

function getBoardCopy(board: getTypeOf['Board']) {
    const copy = JSON.parse(JSON.stringify(board));
    return Promise.resolve(copy);
}

function getBoard() {
    const board = storageService.load(BOARD_STORAGE_KEY);
    if (!board) {
        return Promise.resolve(createBoard());
    }
    return Promise.resolve(board);
}

function createBoard() {
    const board: getTypeOf['Board'] = [];
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

function saveBoard(board: getTypeOf['Board']) {
    storageService.store(BOARD_STORAGE_KEY, board);
    return board;
}





