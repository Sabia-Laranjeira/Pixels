function createPixel(state = false, id = 0) {
  const states = {true:'on',false:'off'}
  const pixel = document.createElement('div');
  pixel.setAttribute('id',`pixel-${id}`);
  pixel.setAttribute('class',`pixel pixel-${states[state]}`);
  return {element:pixel, id:`pixel-${id}`};
}

export default createPixel