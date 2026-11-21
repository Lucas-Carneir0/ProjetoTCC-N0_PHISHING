import  {
  $, sleep
}
from "./UTILIDADES.js";
import  {
  CONFIG
}
from "./CONFIGURACAO.js";
export async function launchSimulation()  {
  const overlay =
  $("#simulationOverlay");
  const log =
  $("#simulationLog");
  const progress =
  $("#simulationProgress");
  if (
  !overlay ||
  !log ||
  !progress
  )  {
    return;
  }
  overlay.hidden = false;
  log.innerHTML = "";
  progress.style.width = "0%";
  const messages = [
  "INICIALIZANDO GOLPE DE PHISHING...",
  "CARREGANDO CONTEÚDO DE EMAIL...",
  "VERIFICANDO MODO DE CONTROLE...",
  "CONECTANDO NO MÓDULO LOCAL...",
  "ACESSO LIBERADO"
  ];
  for (
  let i = 0;
  i < messages.length;
  i++
  )  {
    const line =
    document.createElement("div");
    line.textContent =
    messages[i];
    log.appendChild(line);
    progress.style.width =
    `${(
                ((i + 1) /
                messages.length) *
                100
            )}%`;
    await sleep(330);
  }
  window.location.href =
  CONFIG.simulationPath;
}