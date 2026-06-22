const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight;

let selected = null;

const player = {
  x: 200,
  y: 200,
  type: null
};

// Isla simple estilo pixel
const island = {
  x: 300,
  y: 150,
  size: 200
};

function drawIsland() {
  ctx.fillStyle = "#3aa655"; // verde tipo WorldBox
  ctx.beginPath();
  ctx.arc(island.x, island.y, island.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayer() {
  if (!player.type) return;

  ctx.fillStyle = player.type === "fem" ? "pink" : "orange";
  ctx.fillRect(player.x, player.y, 20, 20);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawIsland();
  drawPlayer();

  requestAnimationFrame(loop);
}
loop();

// Selección de personaje
function selectCharacter(type) {
  player.type = type;
  addMessage("Sistema", "Seleccionaste: " + type);
}

// CHAT
const input = document.getElementById("input");
const messages = document.getElementById("messages");

function addMessage(user, text) {
  const div = document.createElement("div");
  div.textContent = `${user}: ${text}`;
  messages.appendChild(div);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = input.value;
    input.value = "";

    handleCommand(text);
  }
});

// COMANDOS
function handleCommand(text) {
  addMessage("Tú", text);

  const args = text.split(" ");

  switch (args[0]) {
    case "/tp":
      player.x = 200;
      player.y = 150;
      addMessage("Sistema", "Teleportado");
      break;

    case "/color":
      addMessage("Sistema", "El color depende del personaje seleccionado");
      break;

    case "/help":
      addMessage("Sistema", "Comandos: /tp /color /help");
      break;

    default:
      addMessage("Sistema", "Comando no reconocido");
  }
}
