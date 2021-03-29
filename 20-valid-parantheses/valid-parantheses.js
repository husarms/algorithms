/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([)]"
Output: false

Example 5:
Input: s = "{[]}"
Output: true

*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let bracketMap = new Map();
    bracketMap.set(")", "(");
    bracketMap.set("}", "{");
    bracketMap.set("]", "[");

    const array = s.split("");
    const queue = [];

    for (let item of array) {
        let value = bracketMap.get(item);
        if (value) {
            var lastQueueItem = queue[queue.length - 1];
            if (lastQueueItem === value) {
                queue.pop();
                continue;
            }
        }
        queue.push(item);
    }

    return queue.length === 0;
};

var result = isValid("()[]{}");
console.log(result);
