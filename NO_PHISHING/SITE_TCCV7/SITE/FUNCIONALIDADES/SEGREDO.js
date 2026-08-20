import { $, sleep } from "./UTILIDADES.js";
import { CONFIG } from "./CONFIGURACAO.js";
import { state } from "./STATE.js";


const secretSequence = [
    "matrix",
    "decrypt",
    "fishing"
];


export function checkSecretSequence(
    command,
    onSuccess
) {

    if (
        command ===
        secretSequence[state.secretProgress]
    ) {

        state.secretProgress++;


        if (
            state.secretProgress ===
            secretSequence.length
        ) {

            state.secretProgress = 0;


            onSuccess?.();


            return true;
        }


        return false;
    }


    state.secretProgress =
        command === secretSequence[0]
            ? 1
            : 0;


    return false;
}


export async function launchFishingEasterEgg(
    appendOutput
) {

    appendOutput?.(
        "> UNKNOWN COMMAND DETECTED...",
        "warning"
    );

    await sleep(500);


    appendOutput?.(
        "> VERIFYING SECRET ACCESS...",
        "success"
    );

    await sleep(600);


    appendOutput?.(
        "> ACCESS CODE: ACCEPTED",
        "success"
    );

    await sleep(500);


    appendOutput?.(
        "> UNLOCKING HIDDEN MODULE...",
        "success"
    );

    await sleep(700);


    appendOutput?.(
        "> PHISHING FISHING v1.0",
        "success"
    );

    await sleep(500);


    const gameFrame =
        document.createElement("iframe");


    gameFrame.id =
        "phishingGameFrame";


    gameFrame.src =
        CONFIG.easterEggPath;


    gameFrame.title =
        "PHISHING FISHING";


    gameFrame.style.position =
        "fixed";

    gameFrame.style.inset =
        "0";

    gameFrame.style.width =
        "100%";

    gameFrame.style.height =
        "100%";

    gameFrame.style.border =
        "0";

    gameFrame.style.zIndex =
        "999999";


    document.body.appendChild(
        gameFrame
    );


    appendOutput?.(
        "> SECRET MODULE LOADED.",
        "success"
    );
}