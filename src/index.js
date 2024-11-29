import { Grid } from "./Grid.js";

const grid = new Grid();
grid.width = 10;
grid.height = 10;
grid.setGridRoot(document.getElementById('pixels-grid'));
grid.init();
// grid.turnPixelsOn(true,1,1);
grid.drawTrace([0,0],[3,3]);
grid.isLessThan(3,0,1,2,4);
// grid.drawTrace([2,2],[5,4]);
