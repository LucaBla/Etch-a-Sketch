const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';
const DEFAULT_BACKGROUNDCOLOR = 'white';
const DEFAULT_ACTIVE_TOOL = 'color-pen';
const DEFAULT_MODE = 'color';
const DEFAULT_GRIDMODE = '1px solid black';
const DEFAULT_GRIDCOLOR = 'black';

let grid = document.querySelector('.game-container');
let clearButton = document.querySelector('.clear-button');
let pixelSlider = document.querySelector('.pixel-slider');
let penColorPicker = document.querySelector('.pen-color-picker');
let bgColorPicker = document.querySelector('.bg-color-picker');
let penOptionsButtons = document.getElementsByClassName('pen-options-button');
let colorPenButton = document.querySelector('.color-pen');
let rainbowPenButton = document.querySelector('.rainbow-pen');
let eraserButton = document.querySelector('.eraser');
let bucketButton = document.querySelector('.color-bucket');
let gridToggleButton = document.querySelector('.grid-toggle');
let sliderLabel = document.querySelector('#slider-label');
let gridColorPicker = document.querySelector('.grid-color-picker');

let gridSize;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentBackGround = DEFAULT_BACKGROUNDCOLOR;
let currentGridMode = DEFAULT_GRIDMODE;
let currentGridColor = DEFAULT_GRIDCOLOR;

pixelSlider.oninput = () => reloadGrid(pixelSlider.value);
clearButton.onclick = () => reloadGrid(gridSize);
penColorPicker.onchange = (e) => setCurrentColor(e.target.value);
bgColorPicker.onchange = (e) => setBackground(e.target.value);
colorPenButton.onclick = (e) => setMode(e,'color');
rainbowPenButton.onclick = (e) => setMode(e,'rainbow');
eraserButton.onclick = (e) => setMode(e, 'eraser');
bucketButton.onclick = (e) => setMode(e, 'bucket');
gridToggleButton.onclick = (e) => toggleGrid();
gridColorPicker.onchange = (e) => changeGridColor(e.target.value);

function createGrid (size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    gridSize = size;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.style.background = currentBackGround;
        gridElement.style.border = currentGridMode;
        gridElement.classList.add('grid-element');
        grid.appendChild(gridElement);
  }
    sliderLabel.textContent = `${size + 'x' + size}`;
}

function clearGrid(){
    let children = grid.childNodes;
    children = Array.from(children);
    for(let i = 0; i < children.length; i++){
        grid.removeChild(children[i]);
    }
}

function reloadGrid(size){
    clearGrid();
    createGrid(size);
    gridSize = size;
}

function toggleGrid(){
    let gridElements = document.getElementsByClassName('grid-element');
    gridElements = Array.from(gridElements);
    if(currentGridMode === `1px solid ${currentGridColor}`){
        currentGridMode = 'none';
        for(let i= 0; i< gridElements.length; i++){
            gridElements[i].style.border = currentGridMode;
        }
    }else{
        currentGridMode = `1px solid ${currentGridColor}`;
        for(let i= 0; i< gridElements.length; i++){
            gridElements[i].style.border = currentGridMode;
        }
    }
    
}

function changeGridColor(newColor){
    let gridElements = document.getElementsByClassName('grid-element');
    gridElements = Array.from(gridElements);
    for(let i= 0; i< gridElements.length; i++){
        gridElements[i].style.border = `1px solid ${newColor}`;
    }
    currentGridColor = newColor;
    if(currentGridMode === 'none'){

    }else{
        currentGridMode = `1px solid ${currentGridColor}`;
        }
}

function changeColor (e){
    if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode ==='rainbow'){
        let randomColor = generateRandomColor();
        while(randomColor === currentBackGround){
            randomColor = generateRandomColor();
        }
        e.target.style.backgroundColor = randomColor;
    }
    else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = currentBackGround;
    }
    else if(currentMode === 'bucket'){
        e.target.onclick = () => fillWithColor();
    }
}

function setCurrentColor(newColor){
    currentColor = newColor;

}

function fillWithColor(){
    let gridElements = document.getElementsByClassName('grid-element');
    gridElements = Array.from(gridElements);
    for(let i= 0; i< gridElements.length; i++){
        gridElements[i].style.backgroundColor = currentColor;
    }
}

function setBackground(newColor){
    let gridElements = document.getElementsByClassName('grid-element');
    gridElements = Array.from(gridElements);
    currentBackGround = newColor;
    for(let i= 0; i< gridElements.length; i++){
        gridElements[i].style.backgroundColor = newColor;
    }
}

function setMode(e, newMode){
    currentMode = newMode;
    
}

function generateRandomColor(){
    let randomColor  = Math.floor(Math.random()*16777215).toString(16);
    return '#' + randomColor;
}

function updateButtons(activeButton){
    activeTool = document.querySelector(`.${activeButton}`);

    penOptionsButtons = Array.from(penOptionsButtons);
    for(let i = 0; i < penOptionsButtons.length; i++){
        penOptionsButtons[i].style = 'color: rgba(255, 0, 0, 0.6) !important';
    }
    
    activeTool.style ='color: rgba(0, 255, 0, 0.6) !important';
}

function setUpButtons(){
    penOptionsButtons = Array.from(penOptionsButtons);
    for(let i = 0; i < penOptionsButtons.length; i++){
        penOptionsButtons[i].addEventListener('click',function(){updateButtons(penOptionsButtons[i].className.split(" ")[0])});
    }
    updateButtons(DEFAULT_ACTIVE_TOOL);
}

createGrid(DEFAULT_SIZE);
setUpButtons(DEFAULT_ACTIVE_TOOL);