(() => {
    "use strict";

    const CONFIG = {
        introKey: "pularIntro",
        simulationPath: "GOLPE_SIMULAÇÃO/SIMULACAOHTML.html",
        easterEggPath: "PHISHING_GAME.html",
        title: "NO_PHISHING",
        ascii: `
     ╔══════════════════════════════════════╗
     ║   ███ SECURITY AWARENESS ███         ║
     ║                                      ║
     ║        ╭──────────────╮              ║
     ║        │   [ LOCK ]   │              ║
     ║        │   PHISHING   │              ║
     ║        ╰──────┬───────╯              ║
     ║               │                      ║
     ║        EMAIL  ▼  VERIFY              ║
     ╚══════════════════════════════════════╝`,
        bootMessages: [
            "INITIALIZING SECURITY CORE...",
            "LOADING AWARENESS MODULE...",
            "VERIFYING LOCAL INTEGRITY...",
            "STARTING THREAT MONITOR...",
            "SECURITY CHANNEL: ONLINE",
            "PHISHING AWARENESS SYSTEM ONLINE"
        ]
    };

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const state = {
        bootSkipped: false,
        bootTimers: [],
        matrixFrame: null,
        matrixRunning: false,
        matrixTimer: null,
        commandHistory: [],
        historyIndex: -1
    };

    // ------------------------------------------------------------
    // Boot sequence / ASCII
    // ------------------------------------------------------------
    async function typeText(element, text, speed = 70) {
        if (!element) return;
        element.textContent = "";
        for (const char of text) {
            if (state.bootSkipped) return;
            element.textContent += char;
            await sleep(speed);
        }
    }

    async function animateAscii() {
        const target = $("#asciiArt");
        if (!target) return;
        target.textContent = "";
        const lines = CONFIG.ascii.split("\n");
        for (const line of lines) {
            if (state.bootSkipped) return;
            target.textContent += `${line}\n`;
            await sleep(32);
        }
    }

    async function runBoot() {
        const boot = $("#boot");
        const app = $("#terminal");
        const loading = $("#loading");
        const progress = $("#bootProgress");
        const title = $("#titulo");

        if (!boot || !app) return;

        await Promise.all([
            typeText(title, CONFIG.title, 110),
            animateAscii()
        ]);

        if (state.bootSkipped) return;

        loading.innerHTML = "";
        for (let i = 0; i < CONFIG.bootMessages.length; i++) {
            if (state.bootSkipped) return;
            const line = document.createElement("div");
            line.textContent = CONFIG.bootMessages[i];
            loading.appendChild(line);
            progress.style.width = `${Math.round(((i + 1) / CONFIG.bootMessages.length) * 100)}%`;
            await sleep(CONFIG.bootMessages[i].endsWith("...") ? 430 : 260);
        }

        await sleep(550);
        enterTerminal();
    }

    function enterTerminal() {
        state.bootSkipped = true;
        $("#boot").hidden = true;
        $("#terminal").hidden = false;
        cascadeLoad();
        initScrollProgress();
        initTerminal();
    }

    function skipIntro() {
        state.bootSkipped = true;
        state.bootTimers.forEach(clearTimeout);
        localStorage.setItem(CONFIG.introKey, "true");
        enterTerminal();
    }

    // ------------------------------------------------------------
    // Cascade loader
    // ------------------------------------------------------------
    function cascadeLoad() {
        const sections = $$(".cascade-section");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduced) {
            sections.forEach(section => section.classList.add("loaded"));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const section = entry.target;
                section.classList.add("loaded");
                observer.unobserve(section);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

        sections.forEach(section => observer.observe(section));
    }

    // ------------------------------------------------------------
    // Scroll / CRT settings
    // ------------------------------------------------------------
    function initScrollProgress() {
        const progress = $("#progresso");
        if (!progress) return;
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
        };
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update, { passive: true });
        update();
    }

    function initSettings() {
        const panel = $("#painelConfigs");
        const toggle = $("#abrirConfigs");
        const crt = $("#btnCRT");
        const intro = $("#reativarIntro");
        const reduced = $("#btnReduced");

        toggle?.addEventListener("click", () => {
            const open = panel.classList.toggle("aberto");
            toggle.setAttribute("aria-expanded", String(open));
        });

        crt?.addEventListener("click", () => {
            document.body.classList.toggle("sem-crt");
            crt.textContent = document.body.classList.contains("sem-crt")
                ? "Ativar efeito CRT"
                : "Desativar efeito CRT";
        });

        reduced?.addEventListener("click", () => {
            document.body.classList.toggle("reduced-effects");
            reduced.textContent = document.body.classList.contains("reduced-effects")
                ? "Restaurar efeitos"
                : "Reduzir efeitos";
        });

        intro?.addEventListener("click", () => {
            localStorage.removeItem(CONFIG.introKey);
            appendOutput("> Intro reset. Reload the page to run boot sequence again.", "success");
        });
    }

    // ------------------------------------------------------------
    // Simulation launcher
    // ------------------------------------------------------------
    async function launchSimulation() {
        const overlay = $("#simulationOverlay");
        const log = $("#simulationLog");
        const progress = $("#simulationProgress");
        if (!overlay || !log || !progress) return;

        overlay.hidden = false;
        log.innerHTML = "";
        progress.style.width = "0%";

        const messages = [
            "INITIALIZING PHISHING SIMULATOR...",
            "LOADING EMAIL ENVIRONMENT...",
            "VERIFYING CONTROLLED MODE...",
            "CONNECTING TO LOCAL MODULE...",
            "ACCESS GRANTED"
        ];

        for (let i = 0; i < messages.length; i++) {
            const line = document.createElement("div");
            line.textContent = messages[i];
            log.appendChild(line);
            progress.style.width = `${((i + 1) / messages.length) * 100}%`;
            await sleep(330);
        }

        window.location.href = CONFIG.simulationPath;
    }

    // ------------------------------------------------------------
    // Interactive terminal
    // ------------------------------------------------------------
    const COMMANDS = {
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
        scan: () => runScan(),
        simulation: () => launchSimulation(),
        matrix: () => toggleMatrix(true),
        clear: () => {
            $("#terminalOutput").innerHTML = "";
            return [];
        },
        // Easter egg não divulgado no help.
        decrypt: () => [
            "[ CLASSIFIED CHANNEL ]",
            "Você encontrou um comando oculto.",
            "DEFENSE IS NOT A SINGLE TOOL — IT IS A HABIT."
        ]
    };

    function appendOutput(text, type = "") {
        const output = $("#terminalOutput");
        if (!output) return;
        const line = document.createElement("div");
        line.textContent = text;
        if (type) line.className = type;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    async function runScan() {
        appendOutput("> INITIATING SECURITY SCAN...", "success");
        const line = document.createElement("div");
        $("#terminalOutput").appendChild(line);
        for (let i = 0; i <= 20; i++) {
            line.textContent = `[${"█".repeat(i)}${"·".repeat(20 - i)}] ${i * 5}%`;
            await sleep(45);
        }
        [
            "THREATS FOUND: 03",
            "PHISHING ATTEMPTS: 02",
            "DATA LEAKS: 01",
            "> SCAN COMPLETE"
        ].forEach(item => appendOutput(item, "success"));
    }

    function executeCommand(raw) {
        const command = raw.trim().toLowerCase();
        if (!command) return;
        appendOutput(`NO_PHISHING@SECURITY:~$ ${command}`, "user-command");
        function checkSecretSequence(command) {
            if (command === secretSequence[secretProgress]) {
                secretProgress++;

                if (secretProgress === secretSequence.length) {
                    secretProgress = 0;
                    launchFishingEasterEgg();
                    return true;
                }

                return false;
            }

            secretProgress = command === secretSequence[0] ? 1 : 0;
            return false;
        }
        if (checkSecretSequence(command)) {
            return;
        }
        state.commandHistory.push(command);
        state.historyIndex = state.commandHistory.length;

        const action = COMMANDS[command];
        if (!action) {
            appendOutput(`command not found: ${command}. Type "help".`, "error");
            return;
        }

        const result = action();
        if (Array.isArray(result)) result.forEach(line => appendOutput(line, "success"));
    }

    function initTerminal() {
        const form = $("#terminalForm");
        const input = $("#terminalInput");
        if (!form || !input || form.dataset.ready) return;
        form.dataset.ready = "true";

        form.addEventListener("submit", event => {
            event.preventDefault();
            executeCommand(input.value);
            input.value = "";
        });

        input.addEventListener("keydown", event => {
            if (event.key === "ArrowUp") {
                event.preventDefault();
                state.historyIndex = Math.max(0, state.historyIndex - 1);
                input.value = state.commandHistory[state.historyIndex] || "";
            }
            if (event.key === "ArrowDown") {
                event.preventDefault();
                state.historyIndex = Math.min(state.commandHistory.length, state.historyIndex + 1);
                input.value = state.commandHistory[state.historyIndex] || "";
            }
        });

        $("#terminalConsole")?.addEventListener("click", () => input.focus());
    }

    // ------------------------------------------------------------
    // Matrix Easter egg
    // ------------------------------------------------------------
    function toggleMatrix(force = false) {
        const canvas = $("#matrixCanvas");

        if (!canvas) {
            appendOutput("> MATRIX ERROR: CANVAS NOT FOUND.", "error");
            return;
        }

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            appendOutput("> MATRIX ERROR: CANVAS CONTEXT FAILED.", "error");
            return;
        }

        // Se já estiver rodando e não foi uma chamada forçada,
        // encerra o efeito.
        if (state.matrixRunning && !force) {
            state.matrixRunning = false;

            if (state.matrixFrame) {
                cancelAnimationFrame(state.matrixFrame);
                state.matrixFrame = null;
            }

            if (state.matrixTimer) {
                clearTimeout(state.matrixTimer);
                state.matrixTimer = null;
            }

            canvas.classList.remove("active");

            // Limpa o canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            appendOutput("> MATRIX EFFECT: OFF", "success");
            return;
        }

        // Evita iniciar duas vezes
        if (state.matrixRunning) {
            return;
        }

        state.matrixRunning = true;
        canvas.classList.add("active");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 16;
        const columns = Math.max(
            1,
            Math.floor(canvas.width / fontSize)
        );

        const drops = Array(columns).fill(1);

        appendOutput("> MATRIX EFFECT: ON", "success");

        function draw() {
            if (!state.matrixRunning) return;

            ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.fillStyle = "#00ff41";
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, x) => {
                const char = String.fromCharCode(
                    0x30A0 + Math.floor(Math.random() * 96)
                );

                ctx.fillText(
                    char,
                    x * fontSize,
                    y * fontSize
                );

                if (
                    y * fontSize > canvas.height &&
                    Math.random() > 0.975
                ) {
                    drops[x] = 0;
                }

                drops[x]++;
            });

            state.matrixFrame = requestAnimationFrame(draw);
        }

        draw();

        // Duração do Easter egg: 7 segundos
        state.matrixTimer = setTimeout(() => {
            if (state.matrixRunning) {
                toggleMatrix();
            }
        }, 7000);
    }

    // ------------------------------------------------------------
    // CRT glitch micro-event
    // ------------------------------------------------------------
    function randomGlitch() {
        const layer = $("#glitchLayer");
        if (!layer || document.body.classList.contains("reduced-effects")) return;
        layer.classList.remove("active");
        void layer.offsetWidth;
        layer.classList.add("active");
    }
    // ------------------------------------------------------------
    // Game
    // ------------------------------------------------------------
    async function launchFishingEasterEgg() {
        appendOutput("> UNKNOWN COMMAND DETECTED...", "warning");
        await sleep(500);

        appendOutput("> VERIFYING SECRET ACCESS...", "success");
        await sleep(600);

        appendOutput("> ACCESS CODE: ACCEPTED", "success");
        await sleep(500);

        appendOutput("> UNLOCKING HIDDEN MODULE...", "success");
        await sleep(700);

        appendOutput("> PHISHING FISHING v1.0", "success");
        await sleep(500);

        const gameFrame = document.createElement("iframe");

        gameFrame.id = "phishingGameFrame";
        gameFrame.src = CONFIG.easterEggPath;
        gameFrame.title = "PHISHING FISHING";
        gameFrame.style.position = "fixed";
        gameFrame.style.inset = "0";
        gameFrame.style.width = "100%";
        gameFrame.style.height = "100%";
        gameFrame.style.border = "0";
        gameFrame.style.zIndex = "999999";

        document.body.appendChild(gameFrame);

        appendOutput("> SECRET MODULE LOADED.", "success");
    }
    const secretSequence = [
        "matrix",
        "decrypt",
        "fishing"
    ];

    let secretProgress = 0;
    // ------------------------------------------------------------
    // Startup
    // ------------------------------------------------------------
    function init() {
        $("#desativarIntro")?.addEventListener("click", skipIntro);
        $("#btnSimulation")?.addEventListener("click", launchSimulation);
        $("#btnSimulationBottom")?.addEventListener("click", launchSimulation);
        initSettings();

        if (localStorage.getItem(CONFIG.introKey) === "true") {
            enterTerminal();
        } else {
            runBoot();
        }

        setInterval(randomGlitch, 9000);
    }

    document.addEventListener("DOMContentLoaded", init, { once: true });
})();
