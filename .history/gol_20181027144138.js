window.onload = () => {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  currentGen = []
  living = [];
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
  let row = [];
  row.length = 400;
  for (let i = 0; i < 400; i++) {
    row.length = 0;
    row.fill(Math.round(Math.random()), 0, 399);
    living = row.filter((e,j) => {
      if (e == 1) {
        return {
          x: j,
          y: i,
        };
      }
    })
    currentGen.push(row);

  }
  
}

function renderLiving() {
  living.forEach(coord => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(coord.x, coord.y, 1, 1);
  });
}

function evaluate() {

}