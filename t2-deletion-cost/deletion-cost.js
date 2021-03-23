const { performance } = require("perf_hooks");
/* 
    Given a string S
    Deletion of the Kth letter S costs C[K]
    After deleting, costs of deleting other letters does not change
    Delete some of the letters from S to obtain a string without two identical letters next to each
    What is the minimum total costs of all deletions?
    1) 'abccbd', [0, 1, 2, 3, 4, 5]
    answer = 2 (delete c at index 2 for a cost of 2)
    2) 'aabbcc', [1, 2, 1, 2, 1, 2]
    answer = 3 (delete a at index 0, b at index 2, c at index 4, 1 + 1 + 1 = 3)
    3) 'aaaa', [3, 4, 5, 6]
    answer = 12 (3 + 4 + 5)
    4) 'ababa', [10, 5, 10, 5, 10]
    answer = 0 (no need to delete)
*/

function computeDeletionCost(S, C) {
    let t0 = performance.now();
    let array = S.split("");
    let costMap = new Map();
    let minimumCost = 0;
    let lastLetter = "";
    let consecutiveCount = 0;
    let mapKey = "";

    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        const cost = C[i];
        if (letter === lastLetter) {
            consecutiveCount++;
            if(consecutiveCount === 1){
                mapKey = `${letter}${i - 1}`;
                const previousCost = C[i - 1];
                updateCostMap(costMap, mapKey, previousCost, i - 1);
            } 
            updateCostMap(costMap, mapKey, cost, i);
        } else {
            consecutiveCount = 0;
        }
        lastLetter = letter;
    }

    //console.log(`Input: ${S}`);
    costMap.forEach( (value, key) => {
        let sortedData = value.data.sort((a,b) => a.cost - b.cost);
        //console.log(`${key}: ${JSON.stringify(value)}`); 
        while(sortedData.length > 1){
            let item = sortedData.shift();
            //console.log(`Delete at index ${item.index} for cost of ${item.cost}`);
            minimumCost += item.cost;
            array[item.index] = '$';
            //console.log(`Minimum cost: ${item.cost}`);
            //console.log(`Result: ${array.join('')}`);
        } 
    });

    //console.log(costMap);
    let t1 = performance.now();
    //console.log(`Output: ${array.join('')}`);
    let arrayIsValid = validateArray(array);
    console.log(`Array is valid: ${arrayIsValid}`);
    console.log(`Execution time: ${t1 - t0}ms`);
    return minimumCost;
}

function validateArray(array){
    let isValid = true;
    let lastItem = '';
    for(let item of array){
        if(item === lastItem && item !== "$"){
            isValid = false;
            break;
        }
        lastItem = item;
    }
    return isValid;
}

function updateCostMap(map, key, value, index) {
    let currentValue = map.get(key);
    if (currentValue && currentValue.data) {
        currentValue.data.push({ cost: value, index: index });
    } else {
        map.set(key, { data: [{ cost: value, index: index }] });
    }
}

function generateString(length, chars) {
    let string = "";
    for (let i = 0; i < length; i++) {
        string += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return string;
}

function generateCosts(length, min, max) {
    let costs = [];
    for (let i = 0; i < length; i++) {
        const number = Math.floor(Math.random() * (max - min) + min);
        costs.push(number);
    }
    return costs;
}

const length = 16;
//const string = generateString(length, "abcdefghijklmnopqrstuvwxyz");
const string = generateString(length, "ab");
const costs = generateCosts(length, 1, 9);
console.log(string);
console.log(costs.join(','));

const minimumDeletionCost = computeDeletionCost(string, costs);
console.log(`Minimum deletion cost: ${minimumDeletionCost}`);
