import { init } from './config';
import { sounds } from './audio';

export const playground = {
  blocks: [],
  preview: [],
  deletingAnimation: 'init',
  setBlockWidth() {
    const width = document.documentElement.clientWidth || document.body.clientWidth;

    const tempBlockSize = Math.floor(width / (init.columns * 2.6));
    if (tempBlockSize > init.maxBlockSize) {
      init.blockSize = init.maxBlockSize;
    } else if (tempBlockSize < init.minBlockSize) {
      init.blockSize = init.minBlockSize;
    } else {
      init.blockSize = tempBlockSize;
    }
  },
  generatePlaygroundGrid() {
    this.setBlockWidth();
    console.log('generating playground blocks');
    const playground = document.getElementById('playground');
    const root = document.querySelector('html');
    root.style.setProperty('--columns', init.columns);
    root.style.setProperty('--rows', init.rows);
    root.style.setProperty('--block-width', init.blockSize + 'px');
    const numberOfBlocks = init.rows * init.columns;
    for (let i = 0; i < numberOfBlocks; i++) {
      let div = document.createElement('div');
      div.className = 'playgroundBlock';
      init.devMode ? (div.innerHTML = i) : null;
      playground.appendChild(div);
    }
    for (let i = 0; i < init.columns; i++) {
      let div = document.createElement('div');
      div.className = 'playgroundBottom taken';
      playground.appendChild(div);
    }
    this.blocks = Array.from(document.querySelectorAll('.grid div'));
    console.log(`${numberOfBlocks} blocks have been generated`);
  },
  generatePreviewGrid() {
    console.log('generating preview blocks');
    const preview = document.getElementById('nextTetrominoBox');
    const numberOfBlocks = Math.pow(init.previewSize, 2);
    for (let i = 0; i < numberOfBlocks; i++) {
      let div = document.createElement('div');
      div.className = 'playgroundBlock';
      init.devMode ? (div.innerHTML = i) : null;
      preview.appendChild(div);
    }
    this.preview = Array.from(document.querySelectorAll('#nextTetrominoBox div'));
    console.log(`${numberOfBlocks} blocks have been generated for the preview`);
  },
  generateSavedGrid() {
    console.log('generating saved blocks');
    const saved = document.getElementById('savedTetrominoBox');
    const numberOfBlocks = Math.pow(init.previewSize, 2);
    for (let i = 0; i < numberOfBlocks; i++) {
      let div = document.createElement('div');
      div.className = 'playgroundBlock';
      init.devMode ? (div.innerHTML = i) : null;
      saved.appendChild(div);
    }
    this.saved = Array.from(document.querySelectorAll('#savedTetrominoBox div'));
    console.log(`${numberOfBlocks} blocks have been generated for the save slot`);
  },
  generateAllGrid() {
    this.generatePlaygroundGrid();
    this.generatePreviewGrid();
    this.generateSavedGrid();
  },
  cleanPreviewGrid() {
    this.preview.forEach((index) => (index.className = 'playgroundBlock'));
  },
  cleanSavedGrid() {
    this.saved.forEach((index) => (index.className = 'playgroundBlock'));
  },
  removeGrid(id) {
    const playgroundToClean = document.getElementById(id);
    while (playgroundToClean.firstChild) {
      playgroundToClean.removeChild(playgroundToClean.firstChild);
    }
  },
  removeAllGrid() {
    console.log('removing all grids');
    this.removeGrid('nextTetrominoBox');
    this.removeGrid('savedTetrominoBox');
    this.removeGrid('playground');
  },
  cleanAllGrid() {
    console.log('cleaning all grids');
    this.removeGrid('playground');
    this.cleanPreviewGrid();
    this.cleanSavedGrid();
  },
  lineIsMade() {
    let checkLine = [];
    let lineToDelete = [];
    for (let i = 0; i < init.columns; i++) {
      checkLine.push(i);
    }
    for (let i = 0; i < init.rows; i++) {
      const lineTaken = checkLine.every((index) => {
        return (
          this.blocks[i * init.columns + index].classList.contains('taken') ||
          this.blocks[i * init.columns + index].classList.contains('tetromino')
        );
      });
      lineTaken ? lineToDelete.push(i) : null;
    }
    lineToDelete.length ? console.log('line complete', lineToDelete) : 0;
    return lineToDelete;
  },
  animateDeleteLine(lineToDelete) {
    if (lineToDelete.length === 4) {
      sounds.play(sounds.tetris);
      for (let i = 0; i < init.columns; i++) {
        lineToDelete.forEach(
          (index) =>
            (this.blocks[init.columns * index + i].className =
              'playgroundBlock taken specialErasing')
        );
      }
    } else {
      sounds.play(sounds.line);
      for (let i = 0; i < init.columns; i++) {
        lineToDelete.forEach(
          (index) =>
            (this.blocks[init.columns * index + i].className = 'playgroundBlock taken erasing')
        );
      }
    }
  },
  deleteLine(lineArray) {
    for (let j = 0; j < lineArray.length; j++) {
      let saveUpperBlockStyle = [];
      console.log(`deleting line ${lineArray[j]}`);
      for (let i = 0; i < lineArray[j] * init.columns; i++) {
        saveUpperBlockStyle.push(this.blocks[i].className);
        this.blocks[i].className = 'playgroundBlock';
      }
      for (let i = 0; i < lineArray[j] * init.columns; i++) {
        let bottomCheck = this.blocks[i + init.columns].className;
        !bottomCheck.includes('playgroundBottom')
          ? (this.blocks[i + init.columns].className = saveUpperBlockStyle[i])
          : null;
      }
    }
  },
};
