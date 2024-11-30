export class Grid {
  #pixelsElements = null;
  #gridElementRoot  = null;
  #width = null;
  #height = null;

  set width(w) {
    try {
      this.#notNumber(w,'width')
      this.#width = w;
    } catch (err) {
      console.error(err)
    }
    
  }

  set height(h) {
    try {
      this.#notNumber(h,'height') 
      this.#height = h;
    } catch (err) {
      console.error(err);
    }
  }

  get status() {
    return {
      "width":this.#width,
      "height":this.#height,
      "gridElementRoot":this.#gridElementRoot,
      "pixelsElements":this.#pixelsElements
    };
  }

  setGridRoot(element) {
    try {
      this.#isHTML(element);
      this.#gridElementRoot = element;
    } catch (err) {
      console.log(err)
    }
  }

  init(rootElement,width,height) {
    if(!this.#width && !this.#height) {
      throw new Error("[EMPTY PARAMS] Cannot start because the 'width' and 'height' parameters are empty.")
    }
    this.#pixelsElements = this.#createGrid(this.#width,this.#height);
  }

  #notNumber(n,paramsName = 'name') {
    if(Number.isNaN(Number(n))) {
      throw TypeError(`[NOT A NUMBER] The parameter passed to ${paramsName} must be of type number`)
    }
  }

  #isHTML(element) {
    if(!element instanceof HTMLElement) {
      throw TypeError('[NOT HTML] The parameter given must be a HTML element.')
    }
  }

  #convertToOne(number) {
    if(number === 0) {
      return 1
    }
    return number
  }

  #createPixel(id) {
    const pixel = document.createElement('div');
    pixel.setAttribute('id',`pixel-${id}`);
    pixel.setAttribute('class',`pixel pixel-off`);
    return {element:pixel, id:`pixel-${id}`};
  }

  #createGrid(width,height) {
    const pixelsQuantity = width * height;

    this.#gridElementRoot.innerHTML = '';
    this.#gridElementRoot.style.display = 'grid';
    this.#gridElementRoot.style.gridTemplateColumns = `repeat(${width}, 100px)` ;

    const pixelsElemInMatrix = Array(height).fill().map(() => Array());
    let matrixRow = null; 

    this.#gridElementRoot.innerHTML = '';
    let pixel = null;
    for(let p = 0; p < pixelsQuantity; p++) {
      pixel = this.#createPixel(p);
      matrixRow = pixelsElemInMatrix[Math.floor(p/width)];
      matrixRow.push(pixel.element);
      this.#gridElementRoot.appendChild(pixel.element);
    }
    return pixelsElemInMatrix;
  }

  turnPixelsOn(state = true,column = 0, row = 0) {
    state = state ? 'on':'off';
    this.#pixelsElements[row][column].setAttribute('class',`pixel pixel-${state}`)
  }

  #pathTo(start = 0,end = 0) {
    const path = []
    for(let n = start ;n >= end; n--) {
      path.push(n);
    }
    for(let n = start; n <= end; n++) {
      path.push(n)
    }
    return [...path];
  }

  #generatePixelPath(startPosition = [0,0], endPosition = [0,0]) {
    const xPath = this.#pathTo(startPosition[0],endPosition[0]);
    const yPath = this.#pathTo(startPosition[1],endPosition[1])

    if(xPath.length >= yPath.length) {
      const numbersToFill = xPath.length - yPath.length;
      const yPathLastIndex = yPath.length - 1
      for(let c = 0; c < numbersToFill; c++) {
        yPath.push(yPath[yPathLastIndex])
      }    
    } else {
      const numbersToFill = yPath.length - xPath.length;
      const xPathLastIndex = xPath.length - 1;
      for(let c = 0; c < numbersToFill; c++) {
        xPath.push(xPath[xPathLastIndex]);
      }
    }

    return {xPath,yPath}
  }

  drawTrace(startPosition = [0,0], endPosition = [0,0]) {
    this.turnPixelsOn(true,startPosition[0],startPosition[1]);
    
    const {xPath,yPath} = this.#generatePixelPath(startPosition,endPosition);

    for(let i = 0; i < xPath.length; i++) {
       this.turnPixelsOn(true,xPath[i],yPath[i]);
     }
  }
}
