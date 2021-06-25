export const toFriendlyCurrency = (amount: number, noCurrSymbol = false): string => {
    return (noCurrSymbol ? '' : '$') + amount.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}