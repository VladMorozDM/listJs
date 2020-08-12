const unsorted1 = [-27676, 211621, 904304, 161270, -292822, 732004, 860511, -825806, -721722, 536428, -927571, -287004];
const output1 = [904304, -927571, 860511, -825806, 732004, -721722, 536428, -292822, 211621, -287004, 161270, -27676];
const unsorted2 = [5, 2, 7, 8, -2, 25, 25];
const output2 = [25, -2, 25, 2, 8, 5, 7];

const getMeandering = (unsortedArray: number[]): number[] => {
    const compare = (a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }
    const sortedArray = unsortedArray.sort(compare);
    let result: number[] = [];
    let isGreater = true;

    while(sortedArray.length) {
        if (isGreater) {
            result.push(sortedArray.pop());
            isGreater = false;
        } else {
            result.push(sortedArray.shift());
            isGreater = true;
        }
    }

    return result;
}

const result1 = getMeandering(unsorted1);
const result2 = getMeandering(unsorted2)

// console.log('[RESULT]: ');
// console.log(getMeandering(unsorted1));
// console.log('[EXPECTED RESULT]: ');
// console.log(output1);
console.log('[RESULT]: ');
console.log(result2);
console.log('[EXPECTED RESULT]: ');
console.log(output2);