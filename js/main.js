let defaultSquareColor = "#05204a";
let color = "#fff";

let state = "Color";

const DEFAULT_GRID_SIZE = 16;

let gridSize = DEFAULT_GRID_SIZE;

const gridWrapperElement = document.getElementById("grid-wrapper");

const gridSizeModal = document.querySelector(
  ".modal[data-purpose='grid-size']"
);

const gridSizeInput = document.getElementById("input-number-modal-size");

const gridSizeModalOkButton = gridSizeModal.children[0].children[2].children[1];
const gridSizeModalCancelButton =
  gridSizeModal.children[0].children[2].children[0];

gridSizeModalOkButton.addEventListener("click", e => {
  const newSizeInputValue = gridSizeInput.value;
  if (newSizeInputValue > 0 && newSizeInputValue < 150) {
    createNewGrid(newSizeInputValue, true);
    gridSizeModal.style.display = "none";
  }
});

gridSizeModalCancelButton.addEventListener("click", e => {
  gridSizeModal.style.display = "none";
});

const newGridButton = document.getElementById("set-grid-size");
newGridButton.addEventListener("click", e => {
  gridSizeModal.style.display = gridSizeModal.dataset.display;
});

const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", e => {
  setState("Erase");
});

let colorModalTempColor;
const colorModal = document.querySelector(
  ".modal[data-purpose='change-color']"
);

const colorButton = document.getElementById("select-pen-color");
const colorPalletList = colorModal.children[0].children[1].children;
for (let i = 0; i < colorPalletList.length; i++) {
  colorPalletList[i].addEventListener("click", e => {
    colorModalTempColor = colorPalletList[i].dataset.color;
  });
}

const cancelColorModalButton = colorModal.children[0].children[3].children[0];
const okColorModalButton = colorModal.children[0].children[3].children[1];

colorButton.addEventListener("click", e => {
  setState("Color");
  colorModal.style.display = colorModal.dataset.display;
});

okColorModalButton.addEventListener("click", e => {
  setColor(colorModalTempColor);
  colorModal.style.display = "none";
});

cancelColorModalButton.addEventListener("click", e => {
  colorModal.style.display = "none";
});

const customColorChooser = document.getElementById("custom-color");
customColorChooser.addEventListener("change", e => {
  colorModalTempColor = e.target.value;
});

const clearGridButton = document.getElementById("clear-grid");
clearGridButton.addEventListener("click", clearGrid);

function clearGrid(e) {
  const allSquares = gridWrapperElement.children;
  for (let i = 0; i < allSquares.length; i++) {
    allSquares[i].style.backgroundColor = defaultSquareColor;
  }
}

function alterColor(e) {
  if (state === "Color") {
    this.style.backgroundColor = color;
  } else if (state === "Erase") {
    this.style.backgroundColor = defaultSquareColor;
  } else if (state === "Random") {
  }
}

function setState(newState) {
  state = newState;
}

function setColor(newColor = "#fff") {
  color = newColor;
}

function createNewGrid(newGridSize = DEFAULT_GRID_SIZE, reset = false) {
  gridWrapperElement.style.gridTemplateColumns = `repeat(${newGridSize}, 1fr)`;
  if (reset) {
    let currentChild = gridWrapperElement.lastElementChild;
    while (currentChild) {
      gridWrapperElement.removeChild(currentChild);
      currentChild = gridWrapperElement.lastElementChild;
    }
  }

  gridSize = newGridSize;
  let square;
  for (let i = 0; i < gridSize ** 2; i++) {
    square = document.createElement("div");
    square.addEventListener("mouseover", alterColor);
    gridWrapperElement.appendChild(square);
  }
}

createNewGrid();
