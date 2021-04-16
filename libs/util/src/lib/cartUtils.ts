import { Cart, CartLine, CartLineAccount } from "@multi-cart/react-data-access";
import { roundToTwo } from './roundToTwo';
import 'regenerator-runtime/runtime';

// ------------------------
export const sumTotalItems = (cart?: Cart): number => {
    if (cart && cart.cartLines) {
        return cart.cartLines.reduce((sum, cl) => {
            if (cl && typeof cl.quantity === "number") {
                return sum + cl.quantity;
            }
            return 0;
        }, 0);
    }
    return 0;
};

// ------------------
export const sumTotalCost = (cart?: Cart): number => {
    if (cart && cart.cartLines) {
        return cart.cartLines.reduce((sum, cl) => {
            if (cl && typeof cl.price === "number" && typeof cl.quantity == "number") {
                return sum + (cl.price * cl.quantity);
            }
            return 0;
        }, 0);
    }
    return 0;
};


// ------------------
export const getRemainingAmount = (line: CartLine): number => {
    return roundToTwo(getLineTotalWithTax(line.price, line.quantity, 0) - getTotalAmounts(line.cartLineAccounts));
}

// ------------------
export const getLineTotalWithTax = (linePrice: number, lineQuantity: number, lineTax: number): number => {
    let totalCost: number = linePrice * lineQuantity;
    if (lineTax !== 0) {
        totalCost += totalCost * (lineTax / 100); // add tax
    }
    return totalCost;
}

// ------------------
export const getTotalAmounts = (lineAccounts: CartLineAccount[]): number => {
    if (!lineAccounts) {
        return 0;
    }
    return lineAccounts
        .map(la => la.amount)
        .reduce((prev, curr) => prev + curr, 0);
}

// ------------------
export const getRemainingPercentage = (line: CartLine, excludeCartLineAccountId?: number): number => {
    // NOTE: at this stage, the current LA we're trying to compute will ALREADY be in line.cartLineAccounts, so need to be able to exclude it!
    const result = 100 - getTotalPercentages(line, excludeCartLineAccountId);
    return roundToTwo(result);
}

// ------------------
export const getTotalPercentages = (line: CartLine, excludeCartLineAccountId?: number): number => {
    if (!line?.cartLineAccounts) {
        return 0;
    }
    const result = line.cartLineAccounts
        .filter(la => la.id !== excludeCartLineAccountId)
        .map((la: CartLineAccount) => {
            return computePercentageGivenAmount(la, line);
        })
        .reduce((prev, curr) => prev + curr, 0);

    return result;
}

// ------------------------
export const computePercentageGivenAmount = (la: CartLineAccount, line: CartLine) => {
    const ltwt: number = getLineTotalWithTax(line.price, line.quantity, 0);
    if (ltwt === 0) {
        return 100;
    } else {
        const nicelyRoundedPercentage = roundToTwo((la.amount / ltwt) * 100); // NOTE: cannot do Math.round() because I want to allow .1 percent, which will round incorrectly to zero
        return nicelyRoundedPercentage;
    }
}

// ------------------------
export const computeAmountGivenPercentage = (input: {
    linePrice: number,
    lineQuantity: number,
    lineTax: number,
    lineAccountPercentage: number
}) => {
    const ltwt: number = getLineTotalWithTax(input.linePrice, input.lineQuantity, input.lineTax);
    if (ltwt === 0) {
        return 0;
    } else {
        return roundToTwo((input.lineAccountPercentage / 100) * ltwt);
    }
}


