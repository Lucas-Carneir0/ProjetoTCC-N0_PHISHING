import { runScan } from "./TERMINAL.js";
import { launchSimulation } from "./SIMULACAO.js";
import { toggleMatrix } from "./MATRIX.js";

export const COMMANDS = {
    help: () => [
        "AVAILABLE COMMANDS:",
        "about      — sobre o projeto",
        "phishing   — definição resumida",
        "email      — sinais em e-mails",
        "scan       — executar varredura fictícia",
        "status     — status do laboratório",
        "simulation — abrir simulação educativa",
        "credits    — créditos do projeto",
        "clear      — limpar terminal",
        "matrix     — efeito visual temporário"
    ],

    about: () => [
        "NO_PHISHING // TERMINAL EDUCACIONAL",
        "Projeto de conscientização sobre phishing e roubo de dados.",
        "Modo: educativo / ambiente controlado."
    ],

    phishing: () => [
        "PHISHING = tentativa de manipular o usuário para realizar uma ação que favoreça um golpe.",
        "ANALYZE: remetente + domínio + contexto + urgência + pedido de dados."
    ],

    email: () => [
        "EMAIL ANALYSIS CHECKLIST:",
        "[01] remetente suspeito",
        "[02] domínio falso ou parecido",
        "[03] urgência artificial",
        "[04] pedido de senha / dados",
        "[05] link ou anexo inesperado"
    ],

    status: () => [
        "SYSTEM STATUS",
        "-------------------------",
        "CORE: ONLINE",
        "FIREWALL: ACTIVE",
        "PHISHING DEFENSE: ACTIVE",
        "USER AWARENESS: 73%",
        "MODE: EDUCATIONAL"
    ],

    credits: () => [
        "NO_PHISHING // 2026",
        "Projeto de TCC — Terminal Educacional",
        "HTML + CSS + JavaScript puro"
    ],

    simulation: () => launchSimulation(),

    matrix: () => toggleMatrix(true),

    clear: () => {
        document.querySelector("#terminalOutput").innerHTML = [];
        return [];
    }
};