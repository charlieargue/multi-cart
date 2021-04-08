export const toFriendlyCurrency = (amount: number, noCurrSymbol = false): string => {
    return (noCurrSymbol ? '' : '$') + amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
}