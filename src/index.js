import createGrid from "./createGrid.js";
import Screen from "./Screen.js";
import { renderGrid } from "./renderGrid.js";

const width = 5;
const height = 4;
const pixelsQuantity = width * height

const gridElements = createGrid(width,height);
const screen = new Screen(width,height);

let c = 0;
const intervalID = setInterval(() => {
  screen.turnPixelOn(true,c,c);
  renderGrid(width,height,screen,gridElements)
  c++
  if(c === 4) {
    clearInterval(intervalID);
    return
  }
},20)

