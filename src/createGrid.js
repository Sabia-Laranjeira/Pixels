import createPixel from "./createPixel.js";

function createGrid(width = 3, height = 3) {
  const pixelsQuantity = width*height;
  
  const grid = document.getElementById('pixels-grid');
  let pixelsInGrid = Array(height).fill().map(() => Array());
  let gridRow = null;

  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${width}, 100px)`

  grid.innerHTML = '';
  let pixel = null;
  for(let p = 0; p < pixelsQuantity; p++) {
    pixel = createPixel(false,p);
    gridRow = pixelsInGrid[Math.floor(p/width)];
    gridRow.push(pixel.element);
    grid.appendChild(pixel.element);
  }
  
  return pixelsInGrid
}

export default createGrid;