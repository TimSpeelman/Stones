export function randomInRange(start: number, end: number) {
    return Math.floor(Math.random() * (end - start) + 0.5) + start;
}
