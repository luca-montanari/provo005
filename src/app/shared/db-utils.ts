export function convertSnaps<T>(snaps) {
    console.log('snaps', snaps);
    return snaps.map(snap => {
        console.log('snap', snap);
        return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
        } as T;
    }) as T[];
}
