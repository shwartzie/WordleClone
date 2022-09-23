import { storageService } from "../AsyncService/storageService";
import { utilService } from "../../utils/general.utils";
import { getTypeOf } from "../../Types/Types";
export const GameService = {
    setCorrectAnswer,
    setDummyCorrectAnswer,
    setLetterPos,
    onEnter,
    getAttempt,
};

const ATTEMPT_STORAGE_KEY: string = 'attemptDB';


function setDummyCorrectAnswer() {
    return Promise.resolve('RIGHT');
}

function setCorrectAnswer() {
    const words = utilService.generateRandomWords();
    const index = utilService.getRandomInt(0, words.length);
    const word = words.find((word, idx) => index === idx);
    Promise.resolve(word);
}

function getAttempt(attempt: any): getTypeOf['Attempt'] {
    if (!storageService.load(ATTEMPT_STORAGE_KEY)) {
        storageService.store(ATTEMPT_STORAGE_KEY, attempt);
        return attempt;
    }
    return storageService.load(ATTEMPT_STORAGE_KEY);

}

function setLetterPos(dir: string, currentAttempt: any): getTypeOf['Attempt'] {
    if (dir === 'forward') {
        const attempt = { ...currentAttempt, letterPos: currentAttempt.letterPos + 1 };
        storageService.store(ATTEMPT_STORAGE_KEY, attempt);
        return attempt;
    }

    if (currentAttempt.letterPos === 0) return currentAttempt;
    const attempt = { ...currentAttempt, letterPos: currentAttempt.letterPos - 1 };
    storageService.store(ATTEMPT_STORAGE_KEY, attempt);

    return attempt;
}

function onEnter(currentAttempt: any): getTypeOf['Attempt'] {
    const attempt = { attempt: currentAttempt.attempt + 1, letterPos: 0 };
    storageService.store(ATTEMPT_STORAGE_KEY, attempt);
    return attempt;
}