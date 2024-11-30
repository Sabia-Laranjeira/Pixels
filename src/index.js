import { Grid } from "./Grid.js";

const grid = new Grid();
grid.init(document.getElementById('pixels-grid'),10,10);

grid.drawTrace([5,4],[0,9]);

