let living = [];
let currentGen = [];
let changes = [];

window.onload = () => {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  init();
  setInterval(gol, 1000 / 15); //render 15 times/sec
}

function gol() {
  //render backgroud
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  // TODO evaluate life forms

  //render new data
  renderLiving();
};

// populates the canvas with the initial living, random for now
function init() {
  // living initialization
  for (let i = 0; i < 50; i++) {
    living.push({
      x: Math.round(Math.random() * 40 + 180),
      y: Math.round(Math.random() * 40 + 180),
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

function evaluate() {

  changes.forEach(e => {
    const x = e.x;
    const y = e.y;
    livingNeighbours = 0;
    // need to check the 8 elements surrounding the living at x,y
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i !== x && j !== y) {
          if (currentGen[i][j] === 1) {
            livingNeighbours += 1;
          }
        }
      }
    }

  })

}