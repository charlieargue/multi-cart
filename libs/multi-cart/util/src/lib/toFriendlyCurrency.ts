export const toFriendlyCurrency = (amount: number): string => {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
}