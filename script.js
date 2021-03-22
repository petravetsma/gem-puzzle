class GemPuzzle {
  constructor() {
    this.clear();
    this.shuffle(this.elements.gemElements);
    this.init()
  }

  elements = {
    gemText: ['00:00:00', 'New Game', 'Moves 0'],
    gemElements: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 'empty'],
    gemBoard: undefined,
    gemHeading: undefined,
    main: undefined
  }

  state = {
    moves: 0
  }

  clear() {
    this.elements = {
      gemText: ['00:00:00', 'New Game', 'Moves 0'],
      gemElements: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 'empty'],
      gemBoard: undefined,
      gemHeading: undefined,
      main: undefined
    }
    this.state = {
      moves: 0
    }
  }

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.main.classList.add('gem-field');

    // Gem-heading
    this.elements.gemHeading = document.createElement('div');
    this.elements.gemHeading.classList.add('gem-heading');

    // Gem-elements
    this.elements.gemText = this.elements.gemText.map((a) => {
      let el = document.createElement('div');
      el.classList.add('gem-text');
      el.textContent = a;
      return el;
    });

    // Gem-board
    this.elements.gemBoard = document.createElement('div');
    this.elements.gemBoard.classList.add('gem-board');

    // Gem-elements
    this.elements.gemElements = this.elements.gemElements.map((a) => {
      let el = document.createElement('div');
      el.classList.add('gem-element');
      el.textContent = a;
      if (a === 'empty') el.classList.add('empty');
      return el;
    });

    // Add to DOM
    document.body.appendChild(this.elements.main);
    this.elements.main.appendChild(this.elements.gemHeading);

    this.elements.gemText.forEach(a => {
      this.elements.gemHeading.appendChild(a);
    });
    this.elements.gemElements.forEach(a => {
      this.elements.gemBoard.appendChild(a);
    });

    this.elements.main.appendChild(this.elements.gemBoard);
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  swap(nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
  }

  updateMoves() {
    this.state.moves++;
    this.elements.gemText[2].textContent = `Moves ${this.state.moves}`;
  }

  updateTime() {
    function addZeroes(n) {
      return parseInt(n) < 10 ? "0" + n : n;
    }

    date.setSeconds(date.getSeconds() + 1);
    timeText.textContent = `${addZeroes(date.getHours())}:${addZeroes(date.getMinutes())}:${addZeroes(date.getSeconds())}`;
  }


}

let puzzle = new GemPuzzle();
let date = new Date(2011, 0, 1);

let gemBtns = document.querySelectorAll('.gem-element');
let newGameBtn = document.querySelector('.gem-text:nth-child(2)');
let timeText = document.querySelector('.gem-text:first-child');

function gemBtnsEL() {
  gemBtns.forEach(btn => {
    btn.onmousedown = function (event) {
      let emptyIdx = indexInParent(document.querySelector('.empty'))
      let curIdx = indexInParent(btn);
      break1:
        if (emptyIdx === curIdx + 1 || emptyIdx === curIdx - 1 || emptyIdx === curIdx + 4 || emptyIdx === curIdx - 4) {
          if ((emptyIdx % 4 === 0 && emptyIdx === curIdx + 1) || ((emptyIdx + 1) % 4 === 0 && emptyIdx === curIdx - 1)) {
            break break1;
          }
          puzzle.swap(btn, document.querySelector('.empty'));
          puzzle.updateMoves();
        }
    }
  });
}

gemBtnsEL();

function newGameBtnEL() {
  newGameBtn.addEventListener('click', () => {
    document.querySelector('.gem-field').outerHTML = '';
    date = new Date(2011, 0, 1);
    puzzle = new GemPuzzle();
    gemBtns = document.querySelectorAll('.gem-element');
    newGameBtn = document.querySelector('.gem-text:nth-child(2)');
    timeText = document.querySelector('.gem-text:first-child');
    newGameBtnEL()
    gemBtnsEL();
  });
}
newGameBtnEL();

// Timer 
setInterval(puzzle.updateTime, 1000);


function indexInParent(node) {
  var children = node.parentNode.childNodes;
  var num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  return -1;
}
