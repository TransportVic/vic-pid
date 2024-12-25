let stations = [
  'Richmond',
  'South Yarra',
  'Hawksburn',
  'Toorak',
  'Armadale',
  'Malvern',
  'Caulfield',
  'Carnegie',
  'Murrumbeena',
  'Hughesdale',
  'Oakleigh',
  'Huntingdale',
  'Clayton',
  'Westall'
]

function calculateLineNumber() {

  let conDist = false;
  let len = stations.length - 5;

  // if (this.state.connections.length > 0)
  //     conDist = true;

  let blankCells;

  let minCol = 1;
  let maxRow = 11;

  let maxCol = 4;
  let minRow = 5;

  for (let c = minCol; c <= maxCol; c++) {
      blankCells = conDist ? ((c - 1) * 2) : 0;
      if (maxRow * c >= (len + blankCells)) {
          minCol = c;
          break;
      }
  }
  console.log('min', minRow)
  for (let r = minRow; r <= maxRow; r++) {
    blankCells = conDist ? ((maxCol - 1) * 2) : 0;
      if (maxCol * r >= (len + blankCells)) {
          minRow = r;
          break;
      }
  }
  return minRow + 1
  return Math.floor((minRow + maxRow) / 2);
}

console.log(calculateLineNumber())