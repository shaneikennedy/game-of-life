let living = [];
let currentGen = [];
let changes = [];
let rule1 = 0;
let rule2 = 0;
let rule3 = 0;
let rule4 = 0;

window.onload = () => {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  init();
  setInterval(gol, 1000); //render 4 times/sec
}

function gol() {
  //render backgroud
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  // TODO evaluate life forms
  evaluate();
  console.log(rule1, rule2, rule3, rule4)
  rule1 = rule2 = rule3 = rule4 = 0;

  //render new data
  renderLiving();
};

// populates the canvas with the initial living, random for now
function init() {
  // living initialization
  for (let i = 0; i < 20000; i++) {
    living.push({
      x: Math.round(Math.random() * 200 + 200),
      y: Math.round(Math.random() * 200 + 200),
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
    ctx.fillRect(coord.x, coord.y, 5, 5);
  });
}

function isLiving(cell) {
  // living.forEach(e => {
  //   if(e.x === cell.x && e.y === cell.y) return true;
  // });
  // return false;
  return currentGen[cell.x][cell.y] === 1;
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
    rule1++;
    newGen[x][y] = 0;
    newChanges.push({x,y});
  } else if (living && livingNeighbours >= 2 && livingNeighbours <= 3) {
    rule2++;
    // newChanges.push({x,y});
    newLiving.push({x,y});
  } else if (living && livingNeighbours > 3) {
    rule3++;
    newGen[x][y] = 0;
    newChanges.push({x: x, y: y});                
  } else if (!living && livingNeighbours === 3) {
    rule4++;
    newGen[x][y] = 1;
    newChanges.push({x,y});
    newLiving.push({x,y});
  }
}