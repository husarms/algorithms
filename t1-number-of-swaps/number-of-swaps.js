/* 
    Given a string 'baaaaa', 'ababababaaaaab', 'bbbbbbaaaaaabb'
    Compute the minimum number of swaps to achieve no more than 3 consecutive letters
    Example 'baaaaa' -> 'aabaaa' = 1 swap
*/

function computeNumberOfSwaps(input) {
    const array = input.split("");
    let aConsecutiveCount = 0;
    let bConsecutiveCount = 0;
    let aFourthPositionCount = 0;
    let bFourthPositionCount = 0;
    let minimumNumberOfSwaps = 0;

    for (let letter of array) {
        if (letter === "a") {
            aConsecutiveCount++;
            bConsecutiveCount = 0;
            if (aConsecutiveCount === 4) {
                aFourthPositionCount++;
                aConsecutiveCount = 0;
            }
        } else {
            bConsecutiveCount++;
            aConsecutiveCount = 0;
            if (bConsecutiveCount === 4) {
                bFourthPositionCount++;
                bConsecutiveCount = 0;
            }
        }
    }

    // console.log("a 4th position count: " + aFourthPositionCount);
    // console.log("a count: " + aCount);
    // console.log("b 4th position count: " + bFourthPositionCount);
    // console.log("b count: " + bCount);

    minimumNumberOfSwaps += Math.min(aFourthPositionCount, bFourthPositionCount);
    minimumNumberOfSwaps += Math.abs(aFourthPositionCount - bFourthPositionCount);

    return minimumNumberOfSwaps;
}

function computeNumberOfSwapsWithMap(input) {
    const array = input.split("");
    const aMap = new Map();
    aMap.set(1, []);
    aMap.set(2, []);
    aMap.set(3, []);
    aMap.set(4, []);
    const bMap = new Map();
    bMap.set(1, []);
    bMap.set(2, []);
    bMap.set(3, []);
    bMap.set(4, []);

    let aConsecutiveCount = 0;
    let bConsecutiveCount = 0;
    let minimumNumberOfSwaps = 0;

    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        if (letter === "a") {
            aConsecutiveCount++;
            bConsecutiveCount = 0;
            let mapValue = aMap.get(aConsecutiveCount);
            mapValue.push(i);
            aMap.set(aConsecutiveCount, mapValue);
            if (aConsecutiveCount === 4) {
                aConsecutiveCount = 0;
            }
        } else {
            bConsecutiveCount++;
            aConsecutiveCount = 0;
            let mapValue = bMap.get(bConsecutiveCount);
            mapValue.push(i);
            bMap.set(bConsecutiveCount, mapValue);
            if (bConsecutiveCount === 4) {
                bConsecutiveCount = 0;
            }
        }
    }

    minimumNumberOfSwaps += swapArray(array, aMap, bMap);
    minimumNumberOfSwaps += swapArray(array, bMap, aMap);

    console.log('Output: ' + array.join(''));

    let invalidIndices = getInvalidIndices(array);
    console.log('Invalid indices: ' + invalidIndices.join(','));
    //console.log(aMap);
    //console.log(bMap);
    return minimumNumberOfSwaps;
}

function swapArray(array, map1, map2){
    var minimumNumberOfSwaps = 0;
    while(map1.get(4).length > 0){
        var index1 = map1.get(4).shift();
        let index2 = map2.get(4).shift();
        if(index2){
            swapIndices(array, index1, index2);
            minimumNumberOfSwaps++;
            continue;
        }
        index2 = map2.get(1).pop();
        if(index2){
            swapIndices(array, index1, index2);
            minimumNumberOfSwaps++;
            continue;
        }
        index2 = map2.get(2).pop();
        if(index2){
            swapIndices(array, index1, index2);
            minimumNumberOfSwaps++;
            continue;
        }
        index2= amap2.get(3).pop();
        if(index2){
            swapIndices(array, index1, index2);
            minimumNumberOfSwaps++;
            continue;
        }
    }
    return minimumNumberOfSwaps;
}

function getInvalidIndices(array){
    let lastLetter = '';
    let consecutiveCount = 0;
    let invalidIndices = [];
    for(var i = 0; i < array.length; i++){
        const letter = array[i];
        if(letter === lastLetter){
            consecutiveCount++;
            if(consecutiveCount === 3){
                invalidIndices.push(i);
                consecutiveCount = 0;
            }
        } else {
            consecutiveCount = 0;
        }
        lastLetter = letter;
    }
    return invalidIndices;
}

function swapIndices(array, index1, index2){
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

function getRandomAB(){
    return Math.random() < 0.5 ? 'a' : 'b';
}

function generateRandomString(numberOfLetters){
    var array = [];
    for(var i = 0; i < numberOfLetters; i++){
        var ab = getRandomAB();
        array.push(ab);
    }
    return array.join('');
}
const input = generateRandomString(500);
//const input = 'aaaabbbb'
console.log('Input: ' + input);
const numberOfSwapsWithMap = computeNumberOfSwapsWithMap(input);
console.log(`Number of swaps w/ map: ${numberOfSwapsWithMap}`);
const numberOfSwaps = computeNumberOfSwaps(input);
console.log(`Number of swaps: ${numberOfSwaps}`);
