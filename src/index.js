import { Grid } from "./Grid.js";

const grid = new Grid();
grid.width = 10;
grid.height = 10;
grid.setGridRoot(document.getElementById('pixels-grid'));
grid.init();
// grid.turnPixelsOn(true,1,1);
grid.drawTrace([0,0],[9,6]);
// grid.drawTrace([2,2],[5,4]);
