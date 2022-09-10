import { storageService } from "../AsyncService/storageService";
import { utilService } from "../../utils/general.utils";
export const GameService = {
    setCorrectAnswer,
    setDummyCorrectAnswer
};


function setDummyCorrectAnswer() {
    return 'RIGHT';
}

function setCorrectAnswer() {
    const words = utilService.generateRandomWords();
    const index = utilService.getRandomInt(0, words.length);
    return words.find((word, idx) => index === idx);
}