const arng = new alea('digits' + 1);

const operators = ['*', '/', '+', '-'];

const opmap = {
    '*': (n1, n2) => n1 * n2,
    '/': (n1, n2) => n1 / n2,
    '+': (n1, n2) => n1 + n2,
    '-': (n1, n2) => n1 - n2
};

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const chooseNumFromList = set => {
    const chosenIndex = randomInteger(0, set.length - 1);
    const chosenNum = set[chosenIndex];
    const remainingSet = set.toSpliced(chosenIndex, 1);
    return [chosenNum, remainingSet];
};

const generateValidSet = (min, max) => {
    while(true) {
        const smallHalf = Array.from({length: 3}, () => randomInteger(1, 9));
        const bigHalf = Array.from({length: 3}, () => randomInteger(7, 25));
        const set = smallHalf.concat(bigHalf);

        if ((new Set(set)).size !== set.length) {
            continue;
        }

        const numOps = randomInteger(2, 5);
        const ops = Array.from({length: numOps}, () => operators[randomInteger(0, 3)]);

        const [total, _] = ops.reduce((acc, op) => {
            const [currTotal, currSet] = acc;
            const [nextNum, nextSet] = chooseNumFromList(currSet);
            let nextTotal = opmap[op](currTotal, nextNum);
            if (!Number.isInteger(nextTotal)) {
                const replaceOp = operators[randomInteger(1, 3)];
                nextTotal = opmap[replaceOp](currTotal, nextNum);
            }
            return [nextTotal, nextSet];
        }, chooseNumFromList(set));

        if (total >= min && total <= max && Number.isInteger(total)) {
            return [total, set.sort((a, b) => (a - b))];
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    console.log(generateValidSet(1, 99));
    console.log(generateValidSet(100, 199));
    console.log(generateValidSet(200, 299));
    console.log(generateValidSet(300, 399));
    console.log(generateValidSet(400, 499));
});