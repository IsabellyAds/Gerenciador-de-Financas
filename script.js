const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoSelect = document.getElementById("tipo");
const categoriaSelect = document.getElementById("categoria");
const addBtn = document.getElementById("addBtn");
const listaTransacoes = document.getElementById("listaTransacoes");
const entradasEl = document.getElementById("entradas");
const saidasEl = document.getElementById("saidas");
const saldoEl = document.getElementById("saldo");
const modoBtn = document.getElementById("modoBtn");

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function atualizarResumo() {
  let entradas = 0, saidas = 0;

  transacoes.forEach(t => {
    if (t.tipo === "entrada") entradas += t.valor;
    else saidas += t.valor;
  });

  entradasEl.textContent = entradas.toFixed(2);
  saidasEl.textContent = saidas.toFixed(2);
  saldoEl.textContent = (entradas - saidas).toFixed(2);
}

function salvarLocal() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function renderizarTransacoes() {
  listaTransacoes.innerHTML = "";
  transacoes.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.tipo);
    li.innerHTML = `
      <span>${t.descricao} (${t.categoria}) - R$ ${t.valor.toFixed(2)}</span>
      <button class="delete" onclick="removerTransacao(${index})">X</button>
    `;
    listaTransacoes.appendChild(li);
  });
  atualizarResumo();
}

function removerTransacao(index) {
  transacoes.splice(index, 1);
  salvarLocal();
  renderizarTransacoes();
}

addBtn.addEventListener("click", () => {
  const descricao = descricaoInput.value.trim();
  const valor = parseFloat(valorInput.value);
  const tipo = tipoSelect.value;
  const categoria = categoriaSelect.value;

  if (descricao === "" || isNaN(valor) || valor <= 0) {
    alert("Preencha a descrição e o valor corretamente!");
    return;
  }

  const transacao = { descricao, valor, tipo, categoria };
  transacoes.push(transacao);
  salvarLocal();
  renderizarTransacoes();

  descricaoInput.value = "";
  valorInput.value = "";
});

modoBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modoBtn.textContent = document.body.classList.contains("dark") 
    ? "Modo Claro" 
    : "Modo Escuro";
});


renderizarTransacoes();
