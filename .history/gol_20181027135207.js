window.onload = () => {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
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
}

// populates the canvas with the initial living, random for now
function init() {
  //populate them roughly in the middle
  for (let i = 0; i < 50; i++) {
    living.push({
      x: Math.random() * 40 + 180,
      y: Math.random() * 40 + 180,
    });
  }
}

function renderLiving() {
  living.forEach(coord => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(coord.x, coord.y, 1, 1);
  });
}