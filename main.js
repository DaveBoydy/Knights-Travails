/**
 * Takes a starting and finishing chess square(cell)
 * and calculates the number of moves a knight chess piece
 * needs to go from start to end noting the path in the process.
 * @param {array} start - The initial cell
 * @param {array} finish - The last cell
 * @returns {array} An array of cells
 */
const KnightMoves = (start, finish) => {
    // Determines reachable vertices relative to the knights position
    const directions = [
      [2, -1],
      [2, 1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];
  
    const BOARD_DIMENSION = 8; // 8*8 chessboard
  
    // Check if next move is within boundary
    const isWithinBounds = ([x, y]) => {
      return x >= 0 && x < BOARD_DIMENSION && y >= 0 && y < BOARD_DIMENSION;
    };
  
    // Trace the path from the finish back to the start
    const tracePath = (lastMove, last) => {
      const path = [];
      while (last) {
        path.unshift(last.position);
        last = lastMove[last.position];
      }
      return path;
    };
  
    // Track Knights path
    const lastMove = {
      [start]: null,
    };
  
    const queue = [{ position: start, moves: 0 }]; // Track current position and moves
    const visited = new Set(); //Track visited positions
    visited.add(start.toString());
  
    // BFS, every consecutive loop searches child nodes of the previous loop
    while (queue.length != 0) {
      const { position, moves } = queue.shift();
  
      // Query success, output results and terminate procedure
      if (position[0] === finish[0] && position[1] === finish[1]) {
        const path = tracePath(lastMove, { position });
        console.log(`You made it in ${moves} moves! Here's your path: \n`);
        path.forEach((square) => console.log(square));
        return path;
      }
  
      // Generate temporary virtual graph per iteration
      // Vertices relative the knights position(vertex/cell) are child elements in context of BFS
      for (let direction of directions) {
        // Calculate possible vertices
        const nextMove = [position[0] + direction[0], position[1] + direction[1]];
  
        // Calculate valid vertices from possible vertices
        if (isWithinBounds(nextMove) && !visited.has(nextMove.toString())) {
          // Move to child cells
          queue.push({ position: nextMove, moves: moves + 1 });
          // Leave breadcrumbs to back track the shortest path
          lastMove[nextMove] = { position };
          // Remove redundant vertices from possible child vertices
          visited.add(nextMove.toString());
        }
      }
    }
  };
  
  // KnightMoves([0, 0], [7, 7]);
  KnightMoves([3, 3], [4, 3]);