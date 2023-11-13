export function convert2DArrayToHex(arr: number[][]) {
  const binaryArray = arr.map((row) => row.map((item) => (item > 0 ? 1 : 0)));

  const boardSize = binaryArray.length;
  let binaryString = "";

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      binaryString += binaryArray[i][j];
    }
  }

  const decimal = parseInt(binaryString, 2);
  const ret = decimal.toString(16);

  return ret;
}

export function convertHexTo2DArray(hex: number, size: number) {
  const string = hex.toString(2);

  let ret = new Array(size).fill(null).map(() => new Array(size).fill(0));

  let binaryIndex = string.length - 1;
  for (let i = size - 1; i >= 0; i--) {
    for (let j = size - 1; j >= 0; j--) {
      if (binaryIndex >= 0) {
        ret[i][j] = parseInt(string[binaryIndex--], 10);
      }
    }
  }

  return ret;
}
