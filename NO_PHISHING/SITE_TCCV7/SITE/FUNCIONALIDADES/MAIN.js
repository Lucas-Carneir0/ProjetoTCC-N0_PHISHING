import { $ } from "./UTILIDADES.js";

import { CONFIG } from "./CONFIGURACAO.js";

import {
    runBoot,
    enterTerminal,
    skipIntro
} from "./INTRO.js";

import { initSettings } from "./CONFIG.js";

import { launchSimulation } from "./SIMULACAO.js";


/* =========================================================
   GLITCH
========================================================= */

function randomGlitch() {

    const layer =
        $("#glitchLayer");


    if (
        !layer ||
        document.body.classList.contains(
            "reduced-effects"
        )
    ) {
        return;
    }


    layer.classList.remove(
        "active"
    );


    /*
     * Força o navegador a recalcular
     * o elemento para reiniciar a animação.
     */

    void layer.offsetWidth;


    layer.classList.add(
        "active"
    );
}


/* =========================================================
   STARTUP
========================================================= */

function init() {

    /*
     * Botão para pular introdução.
     */

    $("#desativarIntro")
        ?.addEventListener(
            "click",
            skipIntro
        );


    /*
     * Botão principal da simulação.
     */

    $("#btnSimulation")
        ?.addEventListener(
            "click",
            launchSimulation
        );


    /*
     * Botão inferior da simulação.
     */

    $("#btnSimulationBottom")
        ?.addEventListener(
            "click",
            launchSimulation
        );


    /*
     * Configurações.
     */

    initSettings();


    /*
     * Verifica se o usuário
     * já pulou a introdução anteriormente.
     */

    if (
        localStorage.getItem(
            CONFIG.introKey
        ) === "true"
    ) {

        enterTerminal();

    } else {

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


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init,
    {
        once: true
    }
);