const celulas = document.querySelectorAll(".celula");
let checarTurno = true;

const jogador_X = "X";
const jogador_O = "O";

const COMBINACOES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("click", (event) => {
  if (event.target.matches(".celula")) {
    jogar(event.target.id);
  }
});

function jogar(id) {
  const celula = document.getElementById(id);
  const turno = checarTurno ? jogador_X : jogador_O;
  celula.textContent = turno;
  celula.classList.add(turno);
  checarTurno = !checarTurno;
  checarVencedor(turno);
}

function checarVencedor(turno) {
  const vencedor = COMBINACOES.some((comb) => {
    return comb.every((index) => {
      return celulas[index].classList.contains(turno);
    });
  });

  if (vencedor) {
    encerrarJogo(turno);
  } else if (checarEmpate()) {
    encerrarJogo();
  }
}

function checarEmpate() {
  let x = 0;
  let o = 0;

  for (let index in celulas) {
    if (!isNaN(index)) {
      if (celulas[index].classList.contains(jogador_X)) {
        x++;
      }

      if (celulas[index].classList.contains(jogador_O)) {
        o++;
      }
    }
  }

  return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null) {
  const telaEscura = document.getElementById("tela-escura");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");

  telaEscura.style.display = "block";
  telaEscura.appendChild(h2);
  telaEscura.appendChild(h3);

  if (vencedor) {
    h2.innerHTML = `O jogador <span>${vencedor}</span> venceu`;
  } else {
    h2.innerHTML = "Empate";
  }

  let contador = 3;
  const intervalId = setInterval(() => {
    h3.innerHTML = `Reiniciando em ${contador--}`;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    location.reload();
  }, 4000);
}