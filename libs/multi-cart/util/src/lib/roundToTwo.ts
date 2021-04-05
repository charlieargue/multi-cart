// thx: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
export const roundToTwo = (num: number) => {
    return +num.toFixed(2);
    // Note the plus sign that drops any "extra" zeroes at the end.
    // It changes the result (which is a string) into a number again (think "0 + foo"),
    // which means that it uses only as many digits as necessary.
}