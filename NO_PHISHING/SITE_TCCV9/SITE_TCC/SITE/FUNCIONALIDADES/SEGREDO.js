import  {
  $, sleep
}
from "./UTILIDADES.js";
import  {
  CONFIG
}
from "./CONFIGURACAO.js";
import  {
  state
}
from "./STATE.js";
const secretSequence = ["matrix", "decrypt", "fishing"];
export function checkSecretSequence(command, onSuccess)  {
  if (command === secretSequence[state.secretProgress])  {
    state.secretProgress++;
    if (state.secretProgress === secretSequence.length)  {
      state.secretProgress = 0;
      onSuccess?.();
      return true;
    }
    return false;
  }
  state.secretProgress = command === secretSequence[0] ? 1 : 0;
  return false;
}
export async function launchFishingEasterEgg(appendOutput)  {
  appendOutput?.("> UNKNOWN COMMAND DETECTED...", "warning");
  await sleep(600);
  const overlay = document.createElement("div");
  overlay.className = "module-overlay";
  overlay.style.zIndex = "999990";
  overlay.innerHTML = `
    <div class="overlay-box">
      <div class="overlay-title">[ MÓDULO SECRETO DETECTADO ]</div>
      <div class="overlay-log" id="easterEggLog"></div>
      <div style="width: 100%; height: 6px; background: #061806; border: 1px solid var(--green); margin-top: 16px;">
        <div id="easterEggProgress" style="width: 0%; height: 100%; background: var(--green); transition: width 0.5s ease;"></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  const log = overlay.querySelector("#easterEggLog");
  const progress = overlay.querySelector("#easterEggProgress");
  const messages = [
  "UNKNOWN COMMAND DETECTED...",
  "VERIFYING SECRET ACCESS...",
  "ACCESS CODE: ACCEPTED",
  "UNLOCKING HIDDEN MODULE...",
  "INICIANDO PHISHING FISHING v1.0..."
  ];
  for (let i = 0; i < messages.length; i++)  {
    const line = document.createElement("div");
    line.textContent = messages[i];
    log.appendChild(line);
    progress.style.width = `${((i + 1) / messages.length) * 100}%`;
    appendOutput?.(`> ${messages[i]}`, "success");
    await sleep(850);
  }
  await sleep(1000);
  const marioWipe = document.createElement("div");
  marioWipe.className = "mario-wipe-overlay";
  document.body.appendChild(marioWipe);
  marioWipe.getBoundingClientRect();
  marioWipe.classList.add("fechar");
  await sleep(1200);
  overlay.remove();
  const gameFrame = document.createElement("iframe");
  gameFrame.id = "phishingGameFrame";
  gameFrame.title = "PHISHING FISHING";
  gameFrame.style.position = "fixed";
  gameFrame.style.inset = "0";
  gameFrame.style.width = "100%";
  gameFrame.style.height = "100%";
  gameFrame.style.border = "0";
  gameFrame.style.zIndex = "999997";
  const iframeCarregado = new Promise((resolve) =>  {
    gameFrame.onload = () => resolve();
    setTimeout(resolve, 3000);
  }
  );
  gameFrame.src = CONFIG.easterEggPath;
  document.body.appendChild(gameFrame);
  await iframeCarregado;
  await sleep(300);
  marioWipe.classList.remove("fechar");
  await sleep(1200);
  marioWipe.remove();
  appendOutput?.("> SECRET MODULE LOADED.", "success");
}