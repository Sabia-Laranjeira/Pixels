import { Grid } from "./Grid.js";

const grid = new Grid();
grid.width = 5;
grid.height = 4;
grid.setGridRoot(document.getElementById('pixels-grid'));
grid.init()
grid.turnPixelsOn(true,1,1);
console.log(grid.status)

