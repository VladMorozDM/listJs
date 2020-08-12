export const createMatrix = <T>(columns: number, rows: number, fillValue: T): T[][] => {
    const row = () => Array.from({length: columns}, () => fillValue);
    return Array.from({length: rows}, () => row());
};

// this function is more efficient than the first one
export const countPalindromes2 = (str: string) => {
    const length = str.length;
    const intersectionMatrix: number[][] = createMatrix<number>(length, length, 0);
    const booleansMatrix: boolean[][] = createMatrix<boolean>(length, length, false);
    booleansMatrix.forEach((_, rowsIndex: number) => booleansMatrix[rowsIndex][rowsIndex] = true)

    for(let i = 0; i < length - 1; i++) {
        if (str[i] == str[i+1]) {
            booleansMatrix[i][i+1] = true;
            intersectionMatrix[i][i+1] = 1 ;
        }
    }

    for (let searchRange = 2 ; searchRange < length; searchRange++) {
        for (let i = 0; i < length - searchRange; i++) {
            let j = searchRange + i;

            if (str[i] === str[j] && booleansMatrix[i+1][j-1]) {
                booleansMatrix[i][j] = true;
            }
            if (booleansMatrix[i][j]) {
                intersectionMatrix[i][j] = intersectionMatrix[i][j-1] + intersectionMatrix[i+1][j] + 1 - intersectionMatrix[i+1][j-1];
            }
            else {
                intersectionMatrix[i][j] = intersectionMatrix[i][j-1] + intersectionMatrix[i+1][j] - intersectionMatrix[i+1][j-1];
            }

        }

    }
    return intersectionMatrix[0][length-1] + str.length;
}

// this is for logging
export const logRow = <T>(matrix: T[][]) => {
    console.log('START: [');
    matrix.forEach(row => console.log("  " + row));
    console.log('] END');
};

// this function do not pass test because of time limit
const countPalindromes = (str: string) => {
    const length = str.length;
    const markSingleCharactersPalindromes = (row: boolean[], rowsIndex: number) => {
        row[rowsIndex] = true;
        return row;
    };
    const markDoubleCharactersPalindromes = (row: boolean[], rowsIndex: number) => {
        row[rowsIndex + 1] = str[rowsIndex] === str[rowsIndex + 1];
        return row;
    };
    const setDoubleDigitsIntersectionsPalindromes = (row: number[], rowsIndex: number) => {
        row[rowsIndex + 1] = Number(str[rowsIndex] === str[rowsIndex + 1]);
        return row;
    };

    const intersectionMatrix: number[][] = createMatrix<number>(length, length, 0).map(setDoubleDigitsIntersectionsPalindromes);
    const booleansMatrix: boolean[][] = createMatrix<boolean>(length, length, false)
        .map((row: boolean[], rowsIndex: number) => {
            const markedSingleCharRow = markSingleCharactersPalindromes(row, rowsIndex)
            return markDoubleCharactersPalindromes(markedSingleCharRow, rowsIndex);
        })

    for (let searchRange = 2; searchRange < length; searchRange++) {
        for (let rowIndex = 0; rowIndex < length - searchRange; rowIndex++) {
            let columnIndex = searchRange + rowIndex;

            if (str[rowIndex] === str[columnIndex] && booleansMatrix[rowIndex + 1][columnIndex - 1]) {
                booleansMatrix[rowIndex][columnIndex] = true;
            }
            if (booleansMatrix[rowIndex][columnIndex]) {
                intersectionMatrix[rowIndex][columnIndex] =
                    intersectionMatrix[rowIndex][columnIndex - 1]
                    + intersectionMatrix[rowIndex + 1][columnIndex]
                    + 1 - intersectionMatrix[rowIndex + 1][columnIndex - 1];
            } else {
                intersectionMatrix[rowIndex][columnIndex] =
                    intersectionMatrix[rowIndex][columnIndex - 1]
                    + intersectionMatrix[rowIndex + 1][columnIndex]
                    - intersectionMatrix[rowIndex + 1][columnIndex - 1];
            }

        }

    }
    return intersectionMatrix[0][length - 1] + str.length;
}

console.time();
countPalindromes('abccba');
console.timeEnd();
console.time();
console.log(countPalindromes2('abccba'));
console.timeEnd();
