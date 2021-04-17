export const mockNewId = (listIds: number[]): number => {
    console.log(`🚀 ~ listIds`, listIds);
    if (listIds.length) {
        // get max
        const maxId = Math.max(...listIds);
        return maxId + 1;
    } else {
        return 1;
    }

};
