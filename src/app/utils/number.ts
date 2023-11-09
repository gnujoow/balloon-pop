export function convert2DArrayToHex(arr: number[][]) {
  const binaryArray = arr.map(row => row.map(item => item > 0 ? 1 : 0));

  const boardSize = binaryArray.length;
  let binaryString = '';

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      binaryString += binaryArray[i][j];
    }
  }

  const decimal = parseInt(binaryString, 2);
  const ret = decimal.toString(16);

  return ret;
}

export function convertHexTo2DArray(hex: string, size: number) {
  return hex;
}