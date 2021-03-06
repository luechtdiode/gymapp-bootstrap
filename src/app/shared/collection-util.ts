export function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
    return [].concat(...array.map(callbackfn));
}

export function flatten<T>(array: T[][]): T[] {
    return flatMap(array, (monad) => monad);
}
