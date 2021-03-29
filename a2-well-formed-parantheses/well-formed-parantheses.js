/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

0-0, 0-1, 0-2, 1-0, 1-1, 1-2

0-0, -
0-1, -
0-2, -
-  , 1-0
-  , 1-1
-  , 1-2

0-0, -
0-1, -
-  , 1-0
0-2, -
-  , 1-1
-  , 1-2

0-0, -
0-1, -
-  , 1-0
-  , 1-1
0-2, -
-  , 1-2

0-0, -
-  , 1-0
0-1, -
0-2, -
-  , 1-1
-  , 1-2

0-0, -
-  , 1-0
0-1, -
-  , 1-1
0-2, -
-  , 1-2

Input: n = 1
Output: ["()"]

Constraints:

1 <= n <= 8
*/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    var openingParen = new Array(n).fill("(");
    var closingParen = new Array(n).fill(")");
    var result = [];

    for (let i = 0; i < n * 2; i++) {
        let combination = [];
        while (combination < n * 2) {
            combination.push("(");

            combination.push(")");
        }
        result.push(combination.join(""));
    }

    return result;
};

let result = [];

function printParenthesis(str, pos, n, open, close) {
    if (close == n) {
        // print the possible combinations
        result.push(str.join(''));
    } else {
        if (open > close) {
            str[pos] = ")";
            printParenthesis(str, pos + 1, n, open, close + 1);
        }
        if (open < n) {
            str[pos] = "(";
            printParenthesis(str, pos + 1, n, open + 1, close);
        }
    }
}

let n = 5;
let str = new Array(n * 2);
printParenthesis(str, 0, n, 0, 0);
console.log(result);
