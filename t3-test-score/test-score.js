const { performance } = require("perf_hooks");
/* 
    Given an array of test group results - compute the final score for the entire test
    If one part of a group (e.g. '1b' of group '1a' and '1b') does not pass - the entire group fails
    The final score is computed based on the # of groups passed divided by total # of groups
    Example: 2 of the 3 test groups pass = 66% final test score (round down to nearest whole number)
*/

function computeTestScore(results) {
    let allTestGroups = new Set();
    let failedTestGroups = new Set();
    //const prefixIndex = getIndexOfFirstNumber(results[0].name);
    for (let item of results) {
        //const testGroup = parseTestGroup(item.name, prefixIndex);
        const testGroup = item.name.replace(/\D/g,'');
        allTestGroups.add(testGroup);
        if (item.result !== "OK") {
            failedTestGroups.add(testGroup);
        }
    }

    const numberOfTestGroups = allTestGroups.size;
    const numberOfFailedTestGroups = failedTestGroups.size;
    console.log(`Number of test groups (total): ${numberOfTestGroups}`);
    console.log(`Number of failed test groups: ${numberOfFailedTestGroups}`);

    return Math.floor(
        ((numberOfTestGroups - numberOfFailedTestGroups) / numberOfTestGroups) *
            100
    );
}

function parseTestGroup(fullTestName, prefixIndex) {
    //const prefixIndex = getIndexOfFirstNumber(fullTestName);
    const testName = fullTestName.substring(prefixIndex);
    const indexOfFirstLetter = getIndexOfFirstLetter(testName);
    if (indexOfFirstLetter === -1) {
        return testName;
    }
    return testName.substring(0, indexOfFirstLetter);
}

function getIndexOfFirstNumber(s) {
    const array = s.split("");
    for (var i = 0; i < array.length; i++) {
        const character = array[i];
        if (isNumeric(character)) {
            return i;
        }
    }
    return -1;
}

function getIndexOfFirstLetter(s) {
    const array = s.split("");
    for (var i = 0; i < array.length; i++) {
        const character = array[i];
        if (isNonNumeric(character)) {
            return i;
        }
    }
    return -1;
}

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

function isNonNumeric(s) {
    return isNaN(s - parseFloat(s));
}

function generateRandomLetter(chars) {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateResults(numberOfTestGroups) {
    const results = ["OK", "OK", "OK", "Too Slow", "Incorrect"];
    let resultArray = [];
    for (var i = 1; i < numberOfTestGroups; i++) {
        const result = results[Math.floor(Math.random() * results.length)];
        resultArray.push(result);
    }
    return resultArray;
}

function generateTestGroups(prefix, numberOfTestGroups) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const testGroups = [];
    for (var i = 1; i < numberOfTestGroups; i++) {
        const numberOfSubGroups = generateRandomNumber(0, 4);
        if (numberOfSubGroups === 0) {
            testGroups.push(`${prefix}${i}`);
        } else {
            for (var j = 0; j < numberOfSubGroups; j++) {
                const letter = chars.charAt(j);
                testGroups.push(`${prefix}${i}${letter}`);
            }
        }
    }
    return testGroups;
}

// const results = [
//     { name: "testgroup1a", result: "OK" },
//     { name: "testgroup1b", result: "OK" },
//     { name: "testgroup2", result: "OK" },
//     { name: "testgroup3a", result: "OK" },
//     { name: "testgroup3b", result: "Incorrect" },
//     { name: "testgroup3c", result: "Too Slow" },
//     { name: "testgroup4a", result: "OK" },
//     { name: "testgroup4b", result: "OK" },
//     { name: "testgroup5", result: "Incorrect" },
// ];

const testGroups = generateTestGroups("test", 300);
const results = generateResults(300);

console.log(testGroups.slice(0, 20).join("','"));
console.log(results.slice(0, 20).join("','"));

//const results = generateTestResults("testgroup", 100000);
//console.log(results);
// let t0 = performance.now();
// const testScore = computeTestScore(results);
// let t1 = performance.now();
// console.log(`Test score: ${testScore}`);
// console.log(`Execution time: ${t1 - t0}ms`);
