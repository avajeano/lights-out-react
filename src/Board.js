import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, ch ceance anyll is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for(let y = 0; y < nrows; y++) {
      let row = [];
      for(let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      // make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

    // in the copy, flip this cell and the cells around it
    flipCell(y, x);        // Flip this cell
    flipCell(y, x - 1);    // Flip left neighbor
    flipCell(y, x + 1);    // Flip right neighbor
    flipCell(y - 1, x);    // Flip top neighbor
    flipCell(y + 1, x);    // Flip bottom neighbor

    // return the copy
    return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You won!</div>
  }

  // make table board
  const tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      const coord = `${y}-${x}`;
      row.push(
        <Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)}/>
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>)
  }
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  )
}

export default Board;
