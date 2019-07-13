export function mapObject<T, R>(obj: T, callback: (key: keyof T, value: T[keyof T], index: number) => R) {
    return Object.keys(obj).reduce(
        (prev, next, currentIndex) => {
            prev[next] = callback(next as keyof T, obj[next], currentIndex);
            return prev;
        },
        {} as Record<keyof T & string, R>
    );
}
