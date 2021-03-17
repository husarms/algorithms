// https://app.codility.com/programmers/lessons/5-prefix_sums/genomic_range_query/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S, P, Q) {
    // write your code in JavaScript (Node.js 8.9.4)
    let myMap = new Map();
    myMap.set('A', 1);
    myMap.set('C', 2);
    myMap.set('G', 3);
    myMap.set('T', 4);
    let answerMap = new Map();
    let answers = [];
    const queryLength = P.length;
    const stringArray = S.split('');

    for (let i = 0; i < queryLength; i++) {
        const startPosition = P[i];
        const endPosition = Q[i];
        const answerKey = `${startPosition}:${endPosition}`;
        if(answerMap.has(answerKey)){
            answers.push(answerMap.get(answerKey));
        } else {
            const subArray = stringArray.slice(startPosition, endPosition + 1);
            const firstElement = subArray.sort()[0];
            const value = myMap.get(firstElement);
            answerMap.set(`${startPosition}:${endPosition}`, value);
            answers.push(value);
        } 
    }

    return answers;
}
