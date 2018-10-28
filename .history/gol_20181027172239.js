let living = [];
let currentGen = [];
let changes = [];

window.onload = () => {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  init();
  setInterval(gol, 1000); //render 4 times/sec
}

function gol() {
  //render backgroud
  start = Date.now()
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  mid = Date.now()
  // TODO evaluate life forms
  evaluate();

  end = Date.now();
  //render new data
  renderLiving();
  console.log(mid - start, end - mid, Date.now()-end);
};

// populates the canvas with the initial living, random for now
function init() {
  // living initialization
  for (let i = 0; i < 100; i++) {
    living.push({
      x: Math.round(Math.random() * 10 + 200),
      y: Math.round(Math.random() * 10 + 200),
    });
  }

  // Grid initialization
  let row = [];
  row.length = 400;
  for (let i = 0; i < 400; i++) {
    row.fill(0, 0, 399)
    currentGen.push(row.map(e => e));
  }

  // populate grid with living objects
  living.forEach(e => {
    currentGen[e.x][e.y] = 1;
  });

  //initialize changes, during initialization all living ones are the changes
  changes = living.map(e => e);
}

function renderLiving() {
  living.forEach(coord => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(coord.x, coord.y, 1, 1);
  });
}

function isLiving(cell) {
  living.forEach(e => {
    if(e.x === cell.x && e.y === cell.y) return true;
  });
  return false;
}

function evaluate() {
  let newLiving = [];
  // changes for the next generation
  let newChanges = [];
  // represents the next generation 
  let newGen = currentGen.slice(0);
  changes.forEach(e => {
    const x = e.x;
    const y = e.y;
    // need to check the 8 elements surrounding the living at x,y
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        evaluateNeighbours(i, j, newLiving, newChanges, newGen);
      }
    }
  });
  living = newLiving;
  changes = newChanges;
  currentGen = newGen;
}

function evaluateNeighbours(x, y, newLiving, newChanges, newGen) {
  let livingNeighbours = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i !== x && j !== y) {
        livingNeighbours += currentGen[i][j];
      }
    }
  } 
  // Rules check
  const living = isLiving({x,y});
  if (living && livingNeighbours < 2) {
    newGen[x][y] = 0;
    newChanges.push({x,y});
  } else if (living && livingNeighbours >= 2 && livingNeighbours <= 3) {
    newChanges.push({x,y});
    newLiving.push({x,y});
  } else if (living && livingNeighbours > 3) {
    newGen[x][y] = 0;
    newChanges.push({x: x, y: y});                
  } else if (!living && livingNeighbours === 3) {
    newGen[x][y] = 1;
    newChanges.push({x,y});
    newLiving.push({x,y});
  }
}