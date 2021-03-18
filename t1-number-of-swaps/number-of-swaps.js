/* 
    Given a string 'baaaaa', 'ababababaaaaab', 'bbbbbbaaaaaabb'
    Compute the minimum number of swaps to achieve no more than 3 consecutive letters
    Example 'baaaaa' -> 'aabaaa' = 1 swap
*/

function computeNumberOfSwaps(input) {
    const array = input.split("");
    let aCount = 0;
    let bCount = 0;
    let aConsecutiveCount = 0;
    let bConsecutiveCount = 0;
    let aFourthPositionCount = 0;
    let bFourthPositionCount = 0;
    let minimumNumberOfSwaps = 0;

    for (let letter of array) {
        if (letter === "a") {
            aCount++;
            aConsecutiveCount++;
            bConsecutiveCount = 0;
            if (aConsecutiveCount === 4) {
                aFourthPositionCount++;
                aConsecutiveCount = 0;
            }
        } else {
            bCount++;
            bConsecutiveCount++;
            aConsecutiveCount = 0;
            if (bConsecutiveCount === 4) {
                bFourthPositionCount++;
                bConsecutiveCount = 0;
            }
        }
    }

    console.log("a 4th position count: " + aFourthPositionCount);
    console.log("a count: " + aCount);
    console.log("b 4th position count: " + bFourthPositionCount);
    console.log("b count: " + bCount);

    minimumNumberOfSwaps += Math.min(
        aFourthPositionCount,
        bFourthPositionCount
    );
    if (aFourthPositionCount > bFourthPositionCount) {
        minimumNumberOfSwaps += Math.min(
            aFourthPositionCount - bFourthPositionCount,
            bCount
        );
    }
    if (aFourthPositionCount < bFourthPositionCount) {
        minimumNumberOfSwaps += Math.min(
            bFourthPositionCount - aFourthPositionCount,
            aCount
        );
    }

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

    const fourthPositionAValues = aMap.get(4);
    const fourthPositionBValues = bMap.get(4);

    while(fourthPositionAValues.length > 0){
        var aIndex = fourthPositionAValues.shift();
        let bIndex = bMap.get(4).shift();
        if(bIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
        bIndex = bMap.get(1).pop();
        if(bIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
        bIndex = bMap.get(2).pop();
        if(bIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
        bIndex = bMap.get(3).pop();
        if(bIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
    }

    while(fourthPositionBValues.length > 0){
        var bIndex = fourthPositionBValues.shift();
        let aIndex = aMap.get(4).shift();
        if(aIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
        aIndex = aMap.get(1).pop();
        if(aIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
        aIndex = aMap.get(2).pop();
        if(aIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
        aIndex = aMap.get(3).pop();
        if(aIndex){
            swapIndices(array, aIndex, bIndex);
            minimumNumberOfSwaps++;
            continue;
        }
    }

    console.log(array);

    let isValid = validateArray(array);
    console.log(`isValid: ${isValid}`);
    //console.log(aMap);
    //console.log(bMap);
    return minimumNumberOfSwaps;
}

function validateArray(array){
    let lastLetter = '';
    let consecutiveCount = 0;
    let isValid = true;
    for(let letter of array){
        if(letter === lastLetter){
            consecutiveCount++;
            if(consecutiveCount === 4){
                isValid = false;
                break;
            }
        } else {
            consecutiveCount = 0;
        }
        lastLetter = letter;
    }
    return isValid;
}

function swapIndices(array, index1, index2){
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

const numberOfSwaps = computeNumberOfSwaps(
    "bbbbbaababababbbbbbbbbbbaaaabbbbbbabaabababababbbbbbbbbbbbbbaaaaaaaaaaaaaaa"
);
console.log(`Number of swaps: ${numberOfSwaps}`);
