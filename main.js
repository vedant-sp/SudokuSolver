var board=[];

//Get Value From Board
function getBoard() {
    board=[]
    flag= true
    for (let i = 0; i < 9; i++){
        var col=[];
        for (let j = 0; j < 9; j++){
            x = document.getElementById("MyTable").rows[i].cells[j].firstChild.value;
            if (x>9 ){
                flag=flag && false
            }
            else{
                flag=flag && true
                if (x=="" || x=="0"){
                    col.push('.');
                }
                else{
                    col.push(x);
                }
            }
            // col.append(x)
        }
        board.push(col);
    }

    if (isValidSudoku(board) && flag){
        document.getElementById("errorMsg").innerHTML=" "
        sodokuSolver(board)
        console.log(board)
        placeValues(board)
    }
    else{
        document.getElementById("errorMsg").innerHTML="Please check the board and Try Again."
    }
};



//Check if sudoku is valid or not
function isValidSudoku(board) {
    const isUsedInRow = new Array(9).fill(0).map(_ => new Array())
    const isUsedInCol = new Array(9).fill(0).map(_ => new Array())
    const isUsedInSub = new Array(9).fill(0).map(_ => new Array())
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const num = board[i][j]
        if (num === '.') continue
        const subBoxIndex = Math.floor(i / 3) + Math.floor(j / 3) * 3
        if (isUsedInRow[i][num] || isUsedInCol[j][num] || isUsedInSub[subBoxIndex][num]) {
          return false
        }
        isUsedInRow[i][num] = true
        isUsedInCol[j][num] = true
        isUsedInSub[subBoxIndex][num] = true
      }
    }
  
    return true
};


// Solve Sudoku

function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
          return false;
        }
    }
    return true;
}


function sodokuSolver(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == '.') {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = `${k}`;
          if (sodokuSolver(data)) {
           return true;
          } else {
           data[i][j] = '.';
          }
         }
       }
       return false;
     }
   }
 }
 return true;
}

// Place values in Table

function placeValues(data){
    table = document.getElementById("MyTable");
    for(let i = 0; i < 9; i++ ){
        for (let j  = 0; j < 9; j++){
            table.rows[i].cells[j].innerHTML = `<input class="cell" type="number" max="9" min="1"  value=`+data[i][j]+`>`
        }
    }
}


//Reset Values
function resetValues(){
    table = document.getElementById("MyTable");
    for(let i = 0; i < 9; i++ ){
        for (let j  = 0; j < 9; j++){
            table.rows[i].cells[j].innerHTML = `<input class="cell" type="number" max="9" min="1" >`
        }
    }
}