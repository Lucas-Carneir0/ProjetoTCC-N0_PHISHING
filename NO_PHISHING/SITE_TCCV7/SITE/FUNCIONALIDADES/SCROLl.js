import { $ } from "./UTILIDADES.js";


export function initScrollProgress() {

    const progress =
        $("#progresso");


    if (!progress) {
        return;
    }


    const update = () => {

        const max =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            max > 0
                ? Math.min(
                    100,
                    (window.scrollY / max) * 100
                )
                : 0;


        progress.style.width =
            `${percentage}%`;
    };


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        update,
        {
            passive: true
        }
    );


    update();
}