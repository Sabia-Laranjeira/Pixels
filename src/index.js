import { Grid } from "./Grid.js";

const grid = new Grid();
grid.init(document.getElementById('pixels-grid'),100,100,10);

grid.drawTrace([4,4],[10,25]);

