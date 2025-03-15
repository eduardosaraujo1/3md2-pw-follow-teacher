export function randInt(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const REM_IN_PX = parseFloat(
    getComputedStyle(document.documentElement).fontSize
);
