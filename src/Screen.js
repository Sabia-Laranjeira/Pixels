export default class Screen {
  constructor(width,heigth) {
    this.column = width;
    this.row = heigth;
    this.grid = Array(this.row).fill().map(() => Array(this.column).fill(0))
  }

  turnPixelOn(on = true,row = 0,colunm = 0) {
    this.grid[row][colunm] = on ? 1 : 0;
  };
}
