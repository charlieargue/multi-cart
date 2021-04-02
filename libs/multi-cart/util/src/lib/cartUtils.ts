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
export const getRemainingPercentage = (line: CartLine /* w/ Line Accounts */): number => {
    console.log("CART UTILS 🚀 ~ line", line);
    return 100 - getTotalPercentages(line);
}

// ------------------
export const getTotalPercentages = (line: CartLine /* w/ Line Accounts */): number => {
    if (!line.cartLineAccounts) {
        return 0;
    }
    const result = line.cartLineAccounts
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

// ------------------------ TODO: jest test this
export const getAppropriatePercentage = (la: CartLineAccount, line: CartLine) => {
    // IF only 1 LA (in case of just added, it'll be the newly-added one), then compute percentage
    if (line.cartLineAccounts && line.cartLineAccounts.length === 1) {
        return computePercentage(la, line);
    }
    // IF more than 1 LA, then getRemainingPercentage()
    if (line.cartLineAccounts && line.cartLineAccounts.length > 1) {
        return getRemainingPercentage(line);
    }
    return -1;
}


