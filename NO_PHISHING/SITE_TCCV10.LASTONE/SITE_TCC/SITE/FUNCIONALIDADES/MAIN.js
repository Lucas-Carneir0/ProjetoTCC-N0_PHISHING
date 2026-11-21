import  {
  $
}
from "./UTILIDADES.js";
import  {
  CONFIG
}
from "./CONFIGURACAO.js";
import  {
  runBoot,
  enterTerminal,
  skipIntro
}
from "./INTRO.js";
import  {
  initSettings
}
from "./CONFIG.js";
import  {
  launchSimulation
}
from "./SIMULACAO.js";
function randomGlitch()  {
  const layer =
  $("#glitchLayer");
  if (
  !layer ||
  document.body.classList.contains(
  "reduced-effects"
  )
  )  {
    return;
  }
  layer.classList.remove(
  "active"
  );
  void layer.offsetWidth;
  layer.classList.add(
  "active"
  );
}
function init()  {
  $("#desativarIntro")
  ?.addEventListener(
  "click",
  skipIntro
  );
  $("#btnSimulation")
  ?.addEventListener(
  "click",
  launchSimulation
  );
  $("#btnSimulationBottom")
  ?.addEventListener(
  "click",
  launchSimulation
  );
  initSettings();
  if (
  localStorage.getItem(
  CONFIG.introKey
  ) === "true"
  )  {
    enterTerminal();
  } else  {
    runBoot();
  }
  /*
  * Glitch periódico.
  */
  setInterval(
  randomGlitch,
  9000
  );
}
document.addEventListener(
"DOMContentLoaded",
init,
{
  once: true
}
);