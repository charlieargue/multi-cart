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

// ------------------------
/*
computePercentage = () => {
    
    
    // IF first
    result._percentage = this.getRemainingPercentage();


    // OR


    const ltwt: number = this.getLineTotalWithTax(line.price, line.quantity, line.tax);
    if (ltwt === 0) {
        ola._percentage = 0; // TBD: what to do in this case, zero amount, X number of OLAs...
    } else {
        const rawPercentage: number = (ola.amount / ltwt) * 100;


}



*/

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
// export const getRemainingPercentage = (): number => {
//     return 100 - this.ocs.getTotalPercentages(this.oCacheService.getCachedOlas(this.orderLineId, this.orderType));
// }

// // ------------------
// export const getTotalPercentages = (lineAccounts: CartLineAccount[]): number => {
//     if (!lineAccounts) {
//         return 0;
//     }
//     return lineAccounts
//         .map((la: CartLineAccount) => la._percentage)
//         .reduce((prev, curr) => prev + curr, 0);
// }
