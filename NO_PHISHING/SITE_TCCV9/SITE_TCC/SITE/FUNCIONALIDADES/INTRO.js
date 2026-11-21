import  {
  CONFIG
}
from "./CONFIGURACAO.js";
import  {
  $, sleep
}
from "./UTILIDADES.js";
import  {
  state
}
from "./STATE.js";
import  {
  cascadeLoad
}
from "./CASCATA.js";
import  {
  initScrollProgress
}
from "./SCROLl.js";
import  {
  initTerminal
}
from "./TERMINAL.js";
async function typeText(
element,
text,
speed = 70
)  {
  if (!element)  {
    return;
  }
  element.textContent = "";
  for (const char of text)  {
    if (state.bootSkipped)  {
      return;
    }
    element.textContent += char;
    await sleep(speed);
  }
}
export async function runBoot()  {
  const boot =
  $("#boot");
  const app =
  $("#terminal");
  const loading =
  $("#loading");
  const progress =
  $("#bootProgress");
  const title =
  $("#titulo");
  if (!boot || !app)  {
    return;
  }
  await Promise.all([
  typeText(
  title,
  CONFIG.title,
  110
  ),
  ]);
  if (state.bootSkipped)  {
    return;
  }
  loading.innerHTML = "";
  for (
  let i = 0;
  i < CONFIG.bootMessages.length;
  i++
  )  {
    if (state.bootSkipped)  {
      return;
    }
    const line =
    document.createElement("div");
    line.textContent =
    CONFIG.bootMessages[i];
    loading.appendChild(line);
    progress.style.width =
    `${Math.round(
                ((i + 1) /
                CONFIG.bootMessages.length) *
                100
            )}%`;
    await sleep(
    CONFIG.bootMessages[i].endsWith("...")
    ? 430
    : 260
    );
  }
  await sleep(550);
  enterTerminal();
}
export function enterTerminal()  {
  state.bootSkipped = true;
  $("#boot").hidden = true;
  $("#terminal").hidden = false;
  cascadeLoad();
  initScrollProgress();
  initTerminal();
}
export function skipIntro()  {
  state.bootSkipped = true;
  state.bootTimers.forEach(
  clearTimeout
  );
  localStorage.setItem(
  CONFIG.introKey,
  "true"
  );
  enterTerminal();
}