import createPixel from "./createPixel.js";

function createGrid(pixelsQuantity = 0) {
  const grid = document.getElementById('pixels-grid');
  let pixel = null;
  for(let p = 0; p < pixelsQuantity; p++) {
    pixel = createPixel(false,p);
    grid.appendChild(pixel.element);
  }
}

export default createGrid;