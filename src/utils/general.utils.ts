
export const utilService = {
    getRandomInt,
    generateRandomWords
};

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomWords(): string[] {
    return [
        ' honor', 'wound', 'aisle', 'craft', 'shake',
        'fleet', 'swing', 'elect', 'break', 'steam',
        'cause', 'glory', 'print', 'level', 'stuff',
        'brake', 'award', 'theft', 'braid', 'south',
        'count', 'limit', 'allow', 'stamp', 'yearn',
        'theme', 'bride', 'crude', 'child', 'fling',
        'fight', 'death', 'shout', 'sword', 'tribe',
        'loose', 'shaft', 'haunt', 'flock', 'block',
        'bland', 'still', 'short', 'value', 'shell',
        'agent', 'wheel', 'uncle', 'bible', 'fibre'
    ];
}

