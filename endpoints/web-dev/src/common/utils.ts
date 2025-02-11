export const genUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}


export const normalizeFrequencies = (frequencies: Float32Array) => {
    const normalizeDb = (value: number) => {
        const minDb = -100;
        const maxDb = -10;
        let db = 1 - (Math.max(minDb, Math.min(maxDb, value)) * -1) / 100;
        db = Math.sqrt(db);

        return db;
    };

    // Normalize all frequency values
    return frequencies.map((value) => {
        if (value === -Infinity) {
            return 0;
        }
        return normalizeDb(value);
    });
};