export class Grid {
  #pixelsElements = null;
  #gridElementRoot  = null;
  #width = null;
  #height = null;
  #pixelSize = null;

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

  init(rootElement,width = 0,height = 0,pixelSize = 10) {
    this.#isHTML(rootElement);
    this.#notNumber(width,'width');
    this.#notNumber(height,'height');
    this.#notNumber(pixelSize,'pixelSize');

    this.#width = width;
    this.#height = height;
    this.#pixelSize = pixelSize;

    this.#setGridRoot(rootElement);
    this.#pixelsElements = this.#createGrid(this.#width,this.#height);
  }

  drawTrace(startPosition = [0,0], endPosition = [0,0]) {
    try {
      /*Validating params of drawTrace */
      this.#isArrayEmpty(startPosition);
      this.#isArrayEmpty(endPosition);
      for(let n of startPosition){
        this.#notNumber(n, 'startPosition');
      }
      for(let n of endPosition) {
        this.#notNumber(n,'endPosition');
      }
      /* */

      this.turnPixelsOn(true,startPosition[0],startPosition[1]);
      const {xPath,yPath} = this.#generatePixelPath(startPosition,endPosition);
      for(let i = 0; i < xPath.length; i++) {
         this.turnPixelsOn(true,xPath[i],yPath[i]);
       }
    } catch (err) {
      console.error(err);
    }
  }

  turnPixelsOn(state = true,column = 0, row = 0){
    state = state ? 'on':'off';
    this.#pixelsElements[row][column].setAttribute('class',`pixel pixel-${state}`)
  }

  #setGridRoot(element) {
    try {
      this.#isHTML(element);
      this.#gridElementRoot = element;
    } catch (err) {
      console.log(err)
    }
  }

  #createPixel(id) {
    const pixel = document.createElement('div');
    pixel.style.width = `${this.#pixelSize}px`;
    pixel.style.height = `${this.#pixelSize}px`;
    pixel.setAttribute('id',`pixel-${id}`);
    pixel.setAttribute('class',`pixel pixel-off`);
    return {element:pixel, id:`pixel-${id}`};
  }

  #createGrid(width,height) {
    const pixelsQuantity = width * height;

    this.#gridElementRoot.innerHTML = '';
    this.#gridElementRoot.style.display = 'grid';
    this.#gridElementRoot.style.gridTemplateColumns = `repeat(${width}, ${this.#pixelSize}px)` ;
    this.#gridElementRoot.style.gridTemplateRows = `repeat(${height}, ${this.#pixelSize}px)` ;

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
    try {
      this.#isArrayEmpty(startPosition);
  
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
      
    } catch (err) {
      console.error(err);
    }

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

  #isArrayEmpty(array) {
    console.log(arguments)
    if(!array.length) {
      throw new Error('[EMPTY] The array given cannot be empty.')
    }
    if(!array instanceof Array){
      throw new TypeError('[NOT ARRAY] The parameter must be an Array.')
    }
  }
}
