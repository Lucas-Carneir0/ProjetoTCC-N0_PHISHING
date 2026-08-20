(() => {
  const root = document.getElementById("phishing-fishing");
  const terminal = document.getElementById("pf-terminal");
  const input = document.getElementById("pf-input");

  const STORAGE_KEY = "phishingFishing_v1";

  const defaultState = {
    score: 0,
    best: 0,
    catches: 0,
    combo: 0,
    maxCombo: 0,
    rarity: "NONE",
    inventory: [],
    legendary: 0,
    glitches: 0,
    scans: 0,
  };

  let state = loadState();
  let fishing = false;
  let waitingTimer = null;

  const rarities = [
    {
      name: "COMMON",
      chance: 58,
      points: [20, 45],
      color: "pf-system",
      items: [
        "cat_picture.png",
        "meme_final_FINAL.zip",
        "employee_lunch_menu.txt",
        "invoice_very_real.txt",
        "totally_normal_file.dat",
        "office_wifi_password.txt",
      ],
    },
    {
      name: "UNCOMMON",
      chance: 25,
      points: [55, 110],
      color: "",
      items: [
        "credentials.txt",
        "employee_list.csv",
        "passwords.zip",
        "meeting_notes_SECRET.txt",
        "browser_history.txt",
      ],
    },
    {
      name: "RARE",
      chance: 10,
      points: [150, 300],
      color: "pf-rare",
      items: [
        "bank_data.enc",
        "secret_keys.dat",
        "ceo_private_memos.zip",
        "password_manager_backup.db",
        "vpn_config_final_FINAL.conf",
      ],
    },
    {
      name: "EPIC",
      chance: 5,
      points: [350, 600],
      color: "pf-epic",
      items: [
        "totally_not_a_password.txt",
        "root_access_maybe.txt",
        "corporate_secrets_v7.zip",
        "THE_REAL_ADMIN_PASSWORD.txt",
      ],
    },
    {
      name: "LEGENDARY",
      chance: 1.7,
      points: [700, 1200],
      color: "pf-legendary",
      items: [
        "senha_do_admin_DEFINITIVA.txt",
        "infinite_passwords.zip",
        "THE_ONE_RING_OF_CREDENTIALS.dat",
        "admin_admin_admin.txt",
      ],
    },
    {
      name: "GLITCH",
      chance: 0.3,
      points: [1337, 9999],
      color: "pf-glitch",
      items: [
        "the_interface.exe",
        "reality.txt",
        "fish_fish_fish.fish",
        "undefined.undefined",
        "you.txt",
      ],
    },
  ];

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...defaultState, ...(saved || {}) };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

    function print(text = "", className = "") {
    const line = document.createElement("div");

    line.className = "pf-line " + className;
    line.textContent = text;

    terminal.appendChild(line);

    const screen = document.getElementById("pf-screen");
    screen.scrollTop = screen.scrollHeight;
    }

  function printCommand(command) {
    print("> " + command, "pf-command");
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function chooseRarity() {
    const roll = Math.random() * 100;
    let cursor = 0;

    for (const rarity of rarities) {
      cursor += rarity.chance;
      if (roll <= cursor) return rarity;
    }

    return rarities[0];
  }

  function choose(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function fish() {
    if (fishing) {
      print("> A linha já está na água.", "pf-warning");
      return;
    }

    fishing = true;

    print("");
    print("~ linha lançada...");
    print("~ aguardando pacote...");
    print("~ escutando o oceano digital...");
    print("");

    const suspense = [
      "    /\\_/\\\\",
      "   ( o.o )",
      "    > ^ <",
      "",
      "   ~ ~ ~ ~ ~ ~ ~ ~",
      "",
      "   ...",
      "   ...",
      "   ...",
    ];

    suspense.forEach((line, i) => {
      setTimeout(() => print(line, "pf-system"), i * 180);
    });

    waitingTimer = setTimeout(() => {
      const eventRoll = Math.random();

      if (eventRoll < 0.06) {
        fishing = false;
        phishEvent();
        return;
      }

      if (eventRoll < 0.095) {
        fishing = false;
        glitchEvent();
        return;
      }

      catchFile();
    }, 1900);
  }

  function printBox(title, lines = [], width = 45) {
    const innerWidth = width - 2;

    print("┌" + "─".repeat(innerWidth) + "┐");
    print("│" + title.padEnd(innerWidth).slice(0, innerWidth) + "│");
    print("├" + "─".repeat(innerWidth) + "┤");

    lines.forEach((line) => {
      const text = String(line);
      print("│ " + text.padEnd(innerWidth - 2).slice(0, innerWidth - 2) + " │");
    });

    print("└" + "─".repeat(innerWidth) + "┘");
  }

  function catchFile() {
    const rarity = chooseRarity();
    const item = choose(rarity.items);
    const base = random(rarity.points[0], rarity.points[1]);

    state.combo++;

    if (state.combo > state.maxCombo) {
      state.maxCombo = state.combo;
    }

    const multiplier = Math.min(1 + (state.combo - 1) * 0.1, 3);
    const points = Math.floor(base * multiplier);

    state.score += points;
    state.catches++;
    state.rarity = rarity.name;

    if (rarity.name === "LEGENDARY") {
      state.legendary++;
    }

    if (rarity.name === "GLITCH") {
      state.glitches++;
    }

    state.inventory.unshift({
      name: item,
      rarity: rarity.name,
      points,
      time: Date.now(),
    });

    state.inventory = state.inventory.slice(0, 50);

    if (state.score > state.best) {
      state.best = state.score;
    }

    saveState();

    print("> ...algo está puxando a linha!", "pf-warning");
    print("> PACOTE CAPTURADO.", rarity.color);

    print("");

    printBox(
      "  CATCH DETECTED",
      [
        "[" + rarity.name + "]",
        "",
        item,
        "",
        "+" + points + " XP",
        "COMBO x" + multiplier.toFixed(1),
      ],
      47,
    );

    if (rarity.name === "LEGENDARY") {
      print("");
      print("!!! LENDÁRIO !!!", "pf-legendary");
      print("> Você encontrou algo que provavelmente nunca deveria existir.");
      print("> Felizmente, é só texto fictício.", "pf-system");
    }

    if (rarity.name === "GLITCH") {
      print("");
      print("> ERRO: arquivo pescou o pescador.", "pf-glitch");
      print("> ...isso não deveria ser possível.", "pf-glitch");
    }

    fishing = false;
  }

  function phishEvent() {
    print("");
    print("~ A linha está tremendo...", "pf-warning");
    print("");
    print("     ><(((('>", "pf-warning");
    print("");
    print("> ALGO ENORME MORDEU A ISCA.", "pf-danger");
    print("");
    print("[!] PHISH DETECTED", "pf-danger");
    print("> O peixe não era o alvo.");
    print("> VOCÊ era o alvo.", "pf-danger");
    print("");
    print("> Dica de segurança: desconfie de mensagens que tentam");
    print("> criar urgência ou pedir credenciais.", "pf-system");
    print("");

    state.combo = 0;
    saveState();
  }

  function glitchEvent() {
    state.glitches++;
    saveState();

    print("");
    print("███████ GLITCH ███████", "pf-glitch");
    print("> Você pescou...");
    print("> a própria interface.", "pf-glitch");
    print("");
    print("    ┌─────────────┐");
    print("    │   FISH.EXE  │");
    print("    │    010101   │");
    print("    └──────┬──────┘");
    print("           │");
    print("           ▼");
    print("       [ VOCÊ ]");
    print("");
    print("> +??? pontos", "pf-glitch");
    print("> Sistema decidiu que isso conta.");
    print("");

    state.score += 1337;
    state.best = Math.max(state.best, state.score);

    saveState();
  }

  function showStats() {
    print("");

    const comboMultiplier =
      state.combo > 0
        ? Math.min(1 + (state.combo - 1) * 0.1, 3).toFixed(1)
        : "1.0";

    printBox(
      "       FISHING TERMINAL",
      [
        "SCORE:     " + state.score,
        "BEST:      " + state.best,
        "CATCHES:   " + state.catches,
        "COMBO:     x" + comboMultiplier,
        "MAX COMBO: " + state.maxCombo,
        "RARITY:    " + state.rarity,
        "LEGENDARY: " + state.legendary,
        "GLITCHES:  " + state.glitches,
      ],
      34,
    );
  }

  function showInventory() {
    print("");

    const items = [];

    if (!state.inventory.length) {
      items.push("[empty]");
    } else {
      state.inventory.slice(0, 12).forEach((item) => {
        items.push(
          "[" + item.rarity.padEnd(10) + "] " + item.name.slice(0, 24),
        );
      });
    }

    printBox("        INVENTORY", items, 45);

    print("Local only. Nothing here exists outside this game.", "pf-system");
  }

  function scan() {
    state.scans++;
    saveState();

    print("");
    print("> Initiating harmless local scan...");
    print("> Checking game state...");
    print("> Checking imaginary packets...");
    print("> Checking suspicious fish...");
    print("");

    const results = [
      "[OK] No credentials found.",
      "[OK] No cookies accessed.",
      "[OK] No personal information collected.",
      "[OK] No network request required.",
      "[OK] All files are fictional.",
      "[OK] Fish population: questionable.",
    ];

    results.forEach((result, index) => {
      setTimeout(() => print(result, "pf-system"), index * 150);
    });
  }

  function help() {
    print("");
    print("AVAILABLE COMMANDS");
    print("------------------");
    print("fish       launch the bait and catch something");
    print("cast       same as fish");
    print("inventory  inspect your fictional catches");
    print("stats      show score and statistics");
    print("scan       perform a harmless local safety scan");
    print("clear      clear terminal");
    print("about      information about the easter egg");
    print("exit       return to the website");
    print("");
    print("???        There may be undocumented commands...", "pf-warning");
  }

  function about() {
    print("");
    print("PHISHING FISHING");
    print("----------------");
    print("A fictional security-awareness mini game.");
    print("");
    print("Every file, credential, account and packet");
    print("represented here is completely fabricated.");
    print("");
    print("The game does NOT read:");
    print("  - passwords");
    print("  - cookies");
    print("  - tokens");
    print("  - CPF");
    print("  - emails");
    print("  - credentials");
    print("  - personal information");
    print("");
    print("Everything remains inside this browser.", "pf-system");
  }

  function secret(command) {
    if (command === "1337") {
      print("");
      print("   L E E T   M O D E   A C T I V A T E D");
      print("");
      print("Fishing skill +10");
      print("Suspicion skill -10");
      print("Common sense ... unavailable.");
      print("");
      return true;
    }

    if (command === "matrix") {
      print("");
      print("01000110 01001001 01010011 01001000");
      print("01101001 01101110 01100111");
      print("");
      print("> There is no fish.");
      print("> There is only phishing.");
      print("");
      return true;
    }

    if (command === "hack") {
      print("");
      print("> Attempting to hack the fish...");
      setTimeout(() => print("> Fish has enabled 2FA.", "pf-warning"), 400);
      setTimeout(
        () => print("> Fish has changed its password.", "pf-warning"),
        900,
      );
      setTimeout(() => print("> Fish blocked you.", "pf-danger"), 1400);
      return true;
    }

    if (command === "sudo fish") {
      print("");
      print("[sudo] password for fisherman:");
      print("> Nice try.");
      print("> This terminal does not accept passwords.", "pf-system");
      print("> SECURITY LESSON: never type yours here.");
      return true;
    }

    if (command === "admin") {
      print("");
      print("> ACCESS DENIED.");
      print("> Reason: administrator is currently fishing.");
      print("> Administrator caught a trout.");
      return true;
    }

    if (command === "fish.exe") {
      print("");
      print("> ERROR 418: I AM A FISH");
      print("      ><(((('>");
      return true;
    }

    return false;
  }

  function execute(rawCommand) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    printCommand(rawCommand);

    if (command === "fish" || command === "cast") {
      fish();
      return;
    }

    if (command === "inventory" || command === "inv") {
      showInventory();
      return;
    }

    if (command === "stats") {
      showStats();
      return;
    }

    if (command === "scan") {
      scan();
      return;
    }

    if (command === "help" || command === "?") {
      help();
      return;
    }

    if (command === "about") {
      about();
      return;
    }

    if (command === "clear") {
      terminal.innerHTML = "";
      return;
    }

    if (command === "exit" || command === "quit") {
      closePhishingFishing();
      return;
    }

    if (secret(command)) {
      return;
    }

    print("command not found: " + rawCommand, "pf-danger");
    print("Try 'help'.");
  }

  window.openPhishingFishing = function () {
    root.classList.add("visible");
    root.setAttribute("aria-hidden", "false");

    terminal.innerHTML = "";

    print("BOOTING PHISHING FISHING v1.0...");
    print("Loading digital ocean...");
    print("Loading suspicious fish...");
    print("Loading fictional files...");
    print("");
    print("SYSTEM READY.", "pf-system");
    print("");
    print("WARNING: ALL CATCHES ARE FICTIONAL.", "pf-warning");
    print("No credentials or personal data are collected.");
    print("");
    print("Type 'help' to begin.");
    print("");

    input.focus();
  };

  window.closePhishingFishing = function () {
    if (waitingTimer) {
      clearTimeout(waitingTimer);
      waitingTimer = null;
    }

    fishing = false;
    root.classList.remove("visible");
    root.setAttribute("aria-hidden", "true");
  };

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = input.value;
      input.value = "";
      execute(command);
    }

    if (event.key === "Escape") {
      closePhishingFishing();
    }
  });

  root.addEventListener("click", (event) => {
    if (event.target === root) {
      input.focus();
    }
  });

  openPhishingFishing();
})();
