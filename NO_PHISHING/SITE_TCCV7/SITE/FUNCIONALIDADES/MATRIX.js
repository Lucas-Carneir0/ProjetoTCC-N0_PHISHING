import { $ } from "./UTILIDADES.js";
import { state } from "./STATE.js";


export function toggleMatrix(
    force = false,
    output = null
) {

    const canvas =
        $("#matrixCanvas");


    if (!canvas) {

        output?.(
            "> MATRIX ERROR: CANVAS NOT FOUND.",
            "error"
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {

        output?.(
            "> MATRIX ERROR: CANVAS CONTEXT FAILED.",
            "error"
        );

        return;
    }


    /*
     * Se o Matrix já estiver rodando
     * e não for uma chamada forçada,
     * desliga.
     */

    if (
        state.matrixRunning &&
        !force
    ) {

        state.matrixRunning = false;


        if (state.matrixFrame) {

            cancelAnimationFrame(
                state.matrixFrame
            );

            state.matrixFrame = null;
        }


        if (state.matrixTimer) {

            clearTimeout(
                state.matrixTimer
            );

            state.matrixTimer = null;
        }


        canvas.classList.remove(
            "active"
        );


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        output?.(
            "> MATRIX EFFECT: OFF",
            "success"
        );

        return;
    }


    /*
     * Evita duas execuções
     * simultâneas.
     */

    if (state.matrixRunning) {
        return;
    }


    state.matrixRunning = true;


    canvas.classList.add(
        "active"
    );


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    const fontSize = 16;


    const columns =
        Math.max(
            1,
            Math.floor(
                canvas.width /
                fontSize
            )
        );


    const drops =
        Array(columns).fill(1);


    output?.(
        "> MATRIX EFFECT: ON",
        "success"
    );


    function draw() {

        if (!state.matrixRunning) {
            return;
        }


        ctx.fillStyle =
            "rgba(0, 0, 0, 0.08)";


        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "#00ff41";


        ctx.font =
            `${fontSize}px monospace`;


        drops.forEach(
            (y, x) => {

                const char =
                    String.fromCharCode(
                        0x30A0 +
                        Math.floor(
                            Math.random() * 96
                        )
                    );


                ctx.fillText(
                    char,
                    x * fontSize,
                    y * fontSize
                );


                if (
                    y * fontSize >
                    canvas.height &&
                    Math.random() > 0.975
                ) {

                    drops[x] = 0;
                }


                drops[x]++;
            }
        );


        state.matrixFrame =
            requestAnimationFrame(
                draw
            );
    }


    draw();


    /*
     * Matrix dura 7 segundos.
     */

    state.matrixTimer =
        setTimeout(
            () => {

                if (
                    state.matrixRunning
                ) {

                    toggleMatrix(
                        false,
                        output
                    );
                }

            },
            7000
        );
}