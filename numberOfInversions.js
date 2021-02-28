var fs = require("fs");

const getInputFromFile = (fileName) => {
	return fs.readFileSync(fileName).toString().split("\r\n").map(Number);
};

function merge(arr, lo, mid, hi, aux){
    var count = 0;
    var i = lo;
    var j = mid + 1;
    var k = lo;
    while (i <= mid || j <= hi) {
        if (i > mid) {
            arr[k++] = aux[j++];
        } else if (j > hi) {
            arr[k++] = aux[i++];
        } else if (aux[i] <= aux[j]) {
            arr[k++] = aux[i++];
        } else {
            arr[k++] = aux[j++];
            count += mid + 1 - i;
        }
    }
    return count; 
}

function countInversions(arr, lo, hi, aux) {
    if (lo >= hi) {
        return 0;
    }
    var mid = lo + ((hi - lo) / 2 | 0);
    var count = 0;
    count += countInversions(aux, lo, mid, arr);
    count += countInversions(aux, mid + 1, hi, arr);
    count += merge(arr, lo, mid, hi, aux);
    return count;
};

const computeNumberOfInversions = (input) => {
    var aux = input.slice(0);
    return countInversions(input, 0, input.length - 1, aux);
};

const input = getInputFromFile("integer-array.txt");
const numberOfInversions = computeNumberOfInversions(input);
console.log(`Number of inversions: ${numberOfInversions}`);
