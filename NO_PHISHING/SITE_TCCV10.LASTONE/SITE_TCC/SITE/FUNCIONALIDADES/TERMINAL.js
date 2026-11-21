import  {
  $, sleep
}
from "./UTILIDADES.js";
import  {
  state
}
from "./STATE.js";
import  {
  launchSimulation
}
from "./SIMULACAO.js";
import  {
  toggleMatrix
}
from "./MATRIX.js";
import  {
  checkSecretSequence,
  launchFishingEasterEgg
}
from "./SEGREDO.js";
export function appendOutput(
text,
type = ""
)  {
  const output =
  $("#terminalOutput");
  if (!output)  {
    return;
  }
  const line =
  document.createElement("div");
  line.textContent =
  text;
  if (type)  {
    line.className = type;
  }
  output.appendChild(line);
  output.scrollTop =
  output.scrollHeight;
}
async function runScan()  {
  appendOutput(
  "> INITIATING SECURITY SCAN...",
  "success"
  );
  const line =
  document.createElement("div");
  $("#terminalOutput")
  ?.appendChild(line);
  for (
  let i = 0;
  i <= 20;
  i++
  )  {
    line.textContent =
    `[${"█".repeat(i)}${"·".repeat(20 - i)}] ${i * 5}%`;
    await sleep(45);
  }
  [
  "THREATS FOUND: 03",
  "PHISHING ATTEMPTS: 02",
  "DATA LEAKS: 01",
  "> SCAN COMPLETE"
  ].forEach(
  item => appendOutput(
  item,
  "success"
  )
  );
}
const COMMANDS =  {
  help: () => [
  "AVAILABLE COMMANDS:",
  "about      — sobre o projeto",
  "phishing   — o que é phishing e origem",
  "social     — engenharia social e falsas intenções",
  "techniques — técnicas utilizadas (osint, spoofing, malware...)",
  "types      — tipos de phishing e prevenção",
  "theft      — roubo de dados, alvos e consequências",
  "defense    — segurança digital e boas práticas",
  "scan       — executar varredura fictícia",
  "status     — status do laboratório",
  "simulation — abrir simulação educativa",
  "credits    — créditos do projeto",
  "clear      — limpar terminal",
  ],
  about: () => [
  "NO_PHISHING // TERMINAL EDUCACIONAL",
  "Projeto de conscientização sobre phishing e roubo de dados.",
  "Público: leigos e profissionais | Modo: educativo / ambiente controlado."
  ],
  phishing: () => [
  "PHISHING = fraude digital que usa iscas (mensagens, links, páginas falsas) para obter dados sensíveis.",
  "Analogy: 'fishing' (pesca) + 'phreaks'. IBM (2025): ~15% das violações envolvem engenharia social."
  ],
  social: () => [
  "ENGENHARIA SOCIAL = manipulação psicológica focada no fator humano (68% das violações no DBIR 2024).",
  "Falsas intenções / gatilhos: urgência, medo, autoridade, confiança, escassez, reciprocidade e prova social."
  ],
  techniques: () => [
  "TÉCNICAS: OSINT, spoofing, clonagem (Phishing HTTP), typo-squatting, IA generativa,",
  "spywares, keyloggers, falhas web (SQLi/XSS) e exfiltração de dados."
  ],
  types: () => [
  "TIPOS: Phishing por e-mail, Spear Phishing, Whaling/BEC, Smishing (SMS/WhatsApp),",
  "Vishing (voz), Quishing (QR Code) e Phishing de Buscador."
  ],
  theft: () => [
  "ROUBO DE DADOS: captura/exfiltração de credenciais, dados bancários, dados pessoais e ativos corporativos.",
  "Consequências: perdas financeiras, interrupção, dano reputacional e sanções da LGPD (Lei 13.709/2018)."
  ],
  defense: () => [
  "SEGURANÇA E BOAS PRÁTICAS: MFA, senhas fortes/gerenciador, atualizações, validar por canal oficial,",
  "princípio do menor privilégio (RBAC), simulações, ISO/IEC 27001, NIST CSF e cultura sem punição."
  ],
  status: () => [
  "SYSTEM STATUS",
  "-------------------------",
  "CORE: ONLINE",
  "FIREWALL: ACTIVE",
  "PHISHING DEFENSE: ACTIVE",
  "MODE: EDUCATIONAL"
  ],
  credits: () => [
  "NO_PHISHING // 2026",
  "Projeto de TCC — ETEC Bartolomeu Bueno da Silva - Anhanguera",
  "HTML + CSS + JavaScript puro"
  ],
  scan: () => runScan(),
  simulation: () =>
  launchSimulation(),
  matrix: () =>
  toggleMatrix(
  true,
  appendOutput
  ),
  clear: () =>  {
    const output =
    $("#terminalOutput");
    if (output)  {
      output.innerHTML = "";
    }
    return [];
  }
  ,
  decrypt: () => [
  "[ CLASSIFIED CHANNEL ]",
  "Você encontrou um comando oculto.",
  "DEFENSE IS NOT A SINGLE TOOL — IT IS A HABIT."
  ]
}
;
function executeCommand(raw)  {
  const command =
  raw.trim().toLowerCase();
  if (!command)  {
    return;
  }
  appendOutput(
  `NO_PHISHING@SECURITY:~$ ${command}`,
  "user-command"
  );
  if (
  checkSecretSequence(
  command,
  () =>  {
    launchFishingEasterEgg(
    appendOutput
    );
  }
  )
  )  {
    return;
  }
  state.commandHistory.push(
  command
  );
  state.historyIndex =
  state.commandHistory.length;
  const action =
  COMMANDS[command];
  if (!action)  {
    appendOutput(
    `command not found: ${command}. Type "help".`,
    "error"
    );
    return;
  }
  const result =
  action();
  if (
  Array.isArray(result)
  )  {
    result.forEach(
    line =>
    appendOutput(
    line,
    "success"
    )
    );
  }
}
export function initTerminal()  {
  const form =
  $("#terminalForm");
  const input =
  $("#terminalInput");
  if (
  !form ||
  !input ||
  form.dataset.ready
  )  {
    return;
  }
  form.dataset.ready = "true";
  form.addEventListener(
  "submit",
  event =>  {
    event.preventDefault();
    executeCommand(
    input.value
    );
    input.value = "";
  }
  );
  input.addEventListener(
  "keydown",
  event =>  {
    if (
    event.key ===
    "ArrowUp"
    )  {
      event.preventDefault();
      state.historyIndex =
      Math.max(
      0,
      state.historyIndex - 1
      );
      input.value =
      state.commandHistory[
      state.historyIndex
      ] || "";
    }
    if (
    event.key ===
    "ArrowDown"
    )  {
      event.preventDefault();
      state.historyIndex =
      Math.min(
      state.commandHistory.length,
      state.historyIndex + 1
      );
      input.value =
      state.commandHistory[
      state.historyIndex
      ] || "";
    }
  }
  );
  $("#terminalConsole")
  ?.addEventListener(
  "click",
  () => input.focus()
  );
}
