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
    // console.log("🚀 ~ result", result);
    return result;
}

// ------------------------
const computePercentage = (la: CartLineAccount, line: CartLine) => {
    const ltwt: number = getLineTotalWithTax(line.price, line.quantity, 0);
    if (ltwt === 0) {
        return 0;
    } else {
        return (la.amount / ltwt) * 100;
    }
}

// const cla = {
//     "id": 112,
//     "amount": 34,
//     "accountNumber": "68196-702",
//     "cartLineId": 658,
//     "createdAt": "1617343226465",
//     "updatedAt": "1617343226465",
//     "__typename": "CartLineAccount"
// } as CartLineAccount;
// const cl = {
//     "id": 658,
//     "cartId": 770,
//     "itemId": "",
//     "description": "",
//     "categoryId": 1,
//     "uom": "EACH",
//     "quantity": 1,
//     "price": 34,
//     "cartLineAccounts": [
//         // {
//         //     "id": 112,
//         //     "amount": 34,
//         //     "accountNumber": "68196-702",
//         //     "cartLineId": 658,
//         //     "createdAt": "1617343226465",
//         //     "updatedAt": "1617343226465",
//         //     "__typename": "CartLineAccount"
//         // }
//     ],
//     "createdAt": "1617343222075",
//     "updatedAt": "1617343223547",
//     "__typename": "CartLine"
// } as CartLine;
// // console.log(computePercentage(cla, cl));

// // console.log(getRemainingPercentage(cl));
