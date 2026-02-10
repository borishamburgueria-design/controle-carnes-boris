// ================== CONFIG ==================
const STORAGE_PEDIDO = "pedidoAtivo";
const STORAGE_FUNCAO = "funcaoUsuario";
const STORAGE_RELATORIO = "relatorioCarnes";

// ================== ELEMENTOS ==================
const tela = document.getElementById("tela");
const aceitarBtn = document.getElementById("aceitar");
const recusarBtn = document.getElementById("recusar");
const enviarBtn = document.getElementById("enviarPedido");
const zerarBtn = document.getElementById("zerarDia");
const boris = document.getElementById("boris");

// ================== FUNÇÕES ==================
function getPedido() {
  return JSON.parse(localStorage.getItem(STORAGE_PEDIDO));
}

function setPedido(pedido) {
  localStorage.setItem(STORAGE_PEDIDO, JSON.stringify(pedido));
}

function limparPedido() {
  localStorage.removeItem(STORAGE_PEDIDO);
}

function somAlerta() {
  const audio = new Audio("alerta.mp3");
  audio.volume = 1;
  audio.play();
}

function animarBoris() {
  boris.classList.add("pular");
  setTimeout(() => boris.classList.remove("pular"), 1000);
}

// ================== FUNÇÃO ==================
let funcao = localStorage.getItem(STORAGE_FUNCAO);

if (!funcao) {
  tela.innerHTML = `
    <h2>Quem é você?</h2>
    <button onclick="setFuncao('atendente')">Sou Atendente</button>
    <button onclick="setFuncao('chapeiro')">Sou Chapeiro</button>
  `;
}

window.setFuncao = (tipo) => {
  localStorage.setItem(STORAGE_FUNCAO, tipo);
  location.reload();
};

// ================== ATENDENTE ==================
if (funcao === "atendente") {
  tela.innerHTML = `
    <h2>Enviar Pedido</h2>
    <button id="enviarPedido">Enviar pedido</button>
    <button id="zerarDia">Zerar dia</button>
  `;

  document.getElementById("enviarPedido").onclick = () => {
    setPedido({ status: "enviado", hora: Date.now() });
    alert("Pedido enviado para o chapeiro");
  };

  document.getElementById("zerarDia").onclick = () => {
    localStorage.removeItem(STORAGE_RELATORIO);
    alert("Relatório zerado");
  };
}

// ================== CHAPEIRO ==================
if (funcao === "chapeiro") {
  function verificarPedido() {
    const pedido = getPedido();

    if (!pedido) {
      tela.innerHTML = "<h2>Aguardando pedido...</h2>";
      return;
    }

    if (pedido.status === "enviado") {
      tela.innerHTML = `
        <h2>🍔 Pedido recebido</h2>
        <button id="aceitar">ACEITAR</button>
        <button id="recusar">RECUSAR</button>
      `;

      somAlerta();

      document.getElementById("aceitar").onclick = () => {
        animarBoris();
        limparPedido();
        tela.innerHTML = "<h2>Pedido aceito ✅</h2>";
      };

      document.getElementById("recusar").onclick = () => {
        limparPedido();
        tela.innerHTML = "<h2>Pedido recusado ❌</h2>";
      };
    }
  }

  setInterval(verificarPedido, 1500);
}
