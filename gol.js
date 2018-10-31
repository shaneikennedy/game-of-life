/* Globals */

// list of living cells for a given generation
let living = [];
// grid that represents the latest generation
let currentGen = [];
// changes that occured in a given generation
let changes = [];

/* Rule Counters */
let rule1 = 0;
let rule2 = 0;
let rule3 = 0;
let rule4 = 0;

window.onload = () => {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  debug_box = document.getElementById("debug");
  init();
  setInterval(gol, 1000); //render 4 times/sec
}

function gol() {
  // continue only if no overflow
  if (!(living.length > 50000)) {
    //render backgroud
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    evaluate();
    // console.log(rule1, rule2, rule3, rule4)
    rule1 = rule2 = rule3 = rule4 = 0;

    //render new data
    renderLiving(); 

    debug_box.innerHTML = JSON.stringify(living);
  }
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
  row.length = 1000;
  for (let i = 0; i < 1000; i++) {
    row.fill(0, 0, 999)
    currentGen.push(row.map(e => e));
  }

  // populate grid with living objects
  living.forEach(e => {
    currentGen[e.x][e.y] = 1;
  });

  console.log('living length: ' + living.length);

  //initialize changes, during initialization all living ones are the changes
  changes = living.map(e => e);

  console.log('changes length: ' + changes.length);
}

function renderLiving() {
  living.forEach(coord => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(coord.x, coord.y, 5, 5);
  });
}

function isLiving(cell) {
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
    // console.log(rule1, rule2, rule3, rule4);    
  });
  console.log(living.length, newLiving.length);
  changes = newChanges;
  living = newLiving;
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
  const cellIsAlive = isLiving({x,y});
  if (cellIsAlive && livingNeighbours < 2) {
    rule1++;
    newGen[x][y] = 0;
    newChanges.push({x,y});
  } else if (cellIsAlive && (livingNeighbours >= 2 && livingNeighbours <= 3)) {
    rule2++;
    if (!newLiving.includes({x,y})) newLiving.push({x,y});
  } else if (cellIsAlive && livingNeighbours > 3) {
    rule3++;
    newGen[x][y] = 0;
    newChanges.push({x: x, y: y});                
  } else if (!cellIsAlive && livingNeighbours === 3) {
    rule4++;
    newGen[x][y] = 1;
    newChanges.push({x,y});
    if (!newLiving.includes({x,y})) newLiving.push({x,y});
  }

  return newLiving;
}