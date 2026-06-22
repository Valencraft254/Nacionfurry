const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 280;
canvas.height = window.innerHeight;

// 🌍 isla
const island = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 200
};

// 👤 jugador
const player = {
  x: island.x,
  y: island.y,
  size: 10,
  speed: 2
};

// 🌳 árboles
const trees = [];
for (let i = 0; i < 30; i++) {
  trees.push({
    x: island.x + (Math.random() - 0.5) * 300,
    y: island.y + (Math.random() - 0.5) * 300
  });
}

// 🏠 casas
const houses = [];

// 🎮 controles
let mode = "move";
const keys = {};
let drag = null;

// ---------------- INPUT TECLAS ----------------
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// ---------------- MODOS ----------------
function setMode(m) {
  mode = m;
  addMsg("Sistema", "Modo: " + m);
}

// ---------------- PLAYER MOVEMENT ----------------
function updatePlayer() {
  if (mode !== "move") return;

  if (keys["w"] || keys["arrowup"]) player.y -= player.speed;
  if (keys["s"] || keys["arrowdown"]) player.y += player.speed;
  if (keys["a"] || keys["arrowleft"]) player.x -= player.speed;
  if (keys["d"] || keys["arrowright"]) player.x += player.speed;

  // límite isla
  const dx = player.x - island.x;
  const dy = player.y - island.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > island.r - 10) {
    player.x -= dx * 0.05;
    player.y -= dy * 0.05;
  }
}

// ---------------- DRAW ----------------
function drawIsland() {
  // mar
  ctx.fillStyle = "#2c7be5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // playa
  ctx.beginPath();
  ctx.arc(island.x, island.y, island.r + 30, 0, Math.PI * 2);
  ctx.fillStyle = "#d9c28f";
  ctx.fill();

  // tierra
  ctx.beginPath();
  ctx.arc(island.x, island.y, island.r, 0, Math.PI * 2);
  ctx.fillStyle = "#3d8f3d";
  ctx.fill();
}

function drawTrees() {
  for (let t of trees) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(t.x, t.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHouses() {
  for (let h of houses) {
    ctx.fillStyle = "#8b5a2b";
    ctx.fillRect(h.x, h.y, h.w, h.h);
  }
}

function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawSelection() {
  if (!drag) return;
  ctx.strokeStyle = "white";
  ctx.strokeRect(drag.x, drag.y, drag.w, drag.h);
}

// ---------------- LOOP ----------------
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawIsland();
  drawTrees();
  drawHouses();

  updatePlayer();
  drawPlayer();

  drawSelection();

  requestAnimationFrame(loop);
}
loop();

// ---------------- CLICK DRAG (CASAS) ----------------
canvas.addEventListener("mousedown", (e) => {
  if (mode !== "select") return;

  drag = {
    x: e.offsetX,
    y: e.offsetY,
    w: 0,
    h: 0
  };
});

canvas.addEventListener("mousemove", (e) => {
  if (!drag) return;

  drag.w = e.offsetX - drag.x;
  drag.h = e.offsetY - drag.y;
});

canvas.addEventListener("mouseup", () => {
  if (!drag) return;

  houses.push({
    x: drag.x,
    y: drag.y,
    w: drag.w,
    h: drag.h
  });

  addMsg("Sistema", "Casa construida");
  drag = null;
});

// ---------------- CHAT ----------------
const input = document.getElementById("input");
const messages = document.getElementById("messages");

function addMsg(user, text) {
  const div = document.createElement("div");
  div.textContent = `${user}: ${text}`;
  messages.appendChild(div);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCommand(input.value);
    input.value = "";
  }
});

function handleCommand(cmd) {
  addMsg("Tú", cmd);

  if (cmd === "/help") {
    addMsg("Sistema", "/help /mode move /mode select");
  }

  if (cmd.startsWith("/mode")) {
    setMode(cmd.split(" ")[1]);
  }
                          }
