/* 
    Given a string 'baaaaa', 'ababababaaaaab', 'bbbbbbaaaaaabb'
    Compute the minimum number of swaps to achieve no more than 3 consecutive letters
    Example 'baaaaa' -> 'aabaaa' = 1 swap
*/

function computeNumberOfSwaps(input) {
    const array = input.split('');
    let aCount = 0;
    let bCount = 0;
    let aConsecutiveCount = 0;
    let bConsecutiveCount = 0;
    let aFourthPositionCount = 0;
    let bFourthPositionCount = 0;
    let minimumNumberOfSwaps = 0;

    for (let letter of array) {
        if (letter === 'a') {
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

    console.log('a 4th position count: ' + aFourthPositionCount);
    console.log('a count: ' + aCount);
    console.log('b 4th position count: ' + bFourthPositionCount);
    console.log('b count: ' + bCount);

    minimumNumberOfSwaps += Math.min(aFourthPositionCount, bFourthPositionCount);
    if(aFourthPositionCount > bFourthPositionCount){
        minimumNumberOfSwaps += Math.min(aFourthPositionCount - bFourthPositionCount, bCount);
    } 
    if(aFourthPositionCount < bFourthPositionCount){
        minimumNumberOfSwaps += Math.min(bFourthPositionCount - aFourthPositionCount, aCount);
    }

    return minimumNumberOfSwaps;
}

const numberOfSwaps = computeNumberOfSwaps("aabaaaabbaabababaaaaaaabbbaabbbbbbbbbbbbbbbbbaabababaaaaaabbabababa");
console.log(`Number of swaps: ${numberOfSwaps}`);
