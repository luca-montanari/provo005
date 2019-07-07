export function isEqual<T>(objectComplete: T, objectPartial: Partial<T>): boolean {
    for (const prop in objectPartial) {
        if (objectComplete.hasOwnProperty(prop)) {
            if (objectComplete[prop] !== objectPartial[prop])
            {
                return false;
            }
        }
    }
    return true;
}
