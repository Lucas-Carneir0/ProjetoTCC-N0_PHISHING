import { $ } from "./UTILIDADES.js";
import { CONFIG } from "./CONFIGURACAO.js";
import { appendOutput } from "./TERMINAL.js";


export function initSettings() {

    const panel =
        $("#painelConfigs");

    const toggle =
        $("#abrirConfigs");

    const crt =
        $("#btnCRT");

    const intro =
        $("#reativarIntro");

    const reduced =
        $("#btnReduced");


    toggle?.addEventListener(
        "click",
        () => {

            const open =
                panel.classList.toggle(
                    "aberto"
                );


            toggle.setAttribute(
                "aria-expanded",
                String(open)
            );
        }
    );


    crt?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "sem-crt"
            );


            crt.textContent =
                document.body.classList.contains(
                    "sem-crt"
                )
                    ? "Ativar efeito CRT"
                    : "Desativar efeito CRT";
        }
    );


    reduced?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "reduced-effects"
            );


            reduced.textContent =
                document.body.classList.contains(
                    "reduced-effects"
                )
                    ? "Restaurar efeitos"
                    : "Reduzir efeitos";
        }
    );


    intro?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                CONFIG.introKey
            );


            appendOutput(
                "> Intro reset. Reload the page to run boot sequence again.",
                "success"
            );
        }
    );
}