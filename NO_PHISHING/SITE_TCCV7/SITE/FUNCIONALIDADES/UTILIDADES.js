export const $ = (
    selector,
    root = document
) => {
    return root.querySelector(selector);
};


export const $$ = (
    selector,
    root = document
) => {
    return [
        ...root.querySelectorAll(selector)
    ];
};


export const sleep = ms => {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
};