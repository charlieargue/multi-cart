export const mockNewId = (listIds: number[]): number => {
    if (listIds.length) {
        // get max
        const maxId = Math.max(...listIds);
        return maxId + 1;
    } else {
        return 1;
    }

};