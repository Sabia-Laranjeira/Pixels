
export function renderGrid(width,height,screen,gridElements) {
  const pixelsQuantity = width * height;
  
  for(let i = 0; i < pixelsQuantity; i++) {
    let row = Math.floor(i/width);
    let column = i - row * width;
    const state = Boolean(screen.grid[row][column])? 'on' : 'off';
  
    gridElements[row][column].setAttribute('class', `pixel pixel-${state}`)
  }
}