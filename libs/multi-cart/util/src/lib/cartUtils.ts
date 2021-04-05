import { Cart, CartLine, CartLineAccount } from "@multi-cart/react-data-access";

// ------------------------
export const sumTotalItems = (cart?: Cart): number | any => {
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

    return getLineTotalWithTax(line.price, line.quantity, 0) - getTotalAmounts(line.cartLineAccounts);
    console.log("A) 🚀 ~ getLineTotalWithTax(line.price, line.quantity, 0)", getLineTotalWithTax(line.price, line.quantity, 0));
    console.log("B) 🚀 ~ getTotalAmounts(line.cartLineAccounts)", getTotalAmounts(line.cartLineAccounts));
    console.log("A - B = 🚀 ~ getRemainingAmount");
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
    return 100 - getTotalPercentages(line, excludeCartLineAccountId);
}

// ------------------
export const getTotalPercentages = (line: CartLine, excludeCartLineAccountId?: number): number => {
    if (!line.cartLineAccounts) {
        return 0;
    }
    const result = line.cartLineAccounts
        .filter(la => la.id !== excludeCartLineAccountId)
        .map((la: CartLineAccount) => {
            return computePercentage(la, line); // hacky: TODO: better way
        })
        .reduce((prev, curr) => prev + curr, 0);
    return result;
}

// ------------------------
export const computePercentage = (la: CartLineAccount, line: CartLine) => {
    const ltwt: number = getLineTotalWithTax(line.price, line.quantity, 0);
    if (ltwt === 0) {
        return 100;
    } else {
        return (la.amount / ltwt) * 100;
    }
}

// DECOMISH: 
// ---------------------         
// --- TODO: jest test this
// NOTE: the _percentage VIEW MODEL does NOT factor into here, only the la.amount, etc...
// NOTE: however, that's not ok, once the percentage starts changing! only initially can we ...
// export const getAppropriatePercentage = (la: CartLineAccount, line: CartLine) => {
//     // IF only 1 LA (in case of just added, it'll be the newly-added one), then compute percentage
//     if (line.cartLineAccounts && line.cartLineAccounts.length === 1) {
//         return computePercentage(la, line);
//     }
//     // IF more than 1 LA, then getRemainingPercentage()
//     if (line.cartLineAccounts && line.cartLineAccounts.length > 1) {
//         return getRemainingPercentage(line);
//     }
//     return -1;
// }

// ------------------
export const calculateDistributionAmount = (line: CartLine, percentage): number => {
    console.log("🚀 ~ percentage", percentage);
    // PROLLY: need excludeCartLineAccountId since don't want to reference own LA?
    const totalPrice = getLineTotalWithTax(line.price, line.quantity, 0);
    console.log("🚀 ~ totalPrice", totalPrice);
    const rawAmount: number = totalPrice * percentage / 100;
    console.log("🚀 ~ rawAmount", rawAmount);
    return rawAmount;
}
