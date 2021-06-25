import { Cart, CartLine, CartLineAccount } from '@multi-cart/react-data-access';
import { areLineAccountsValid, computeAmountGivenPercentage, computePercentageGivenAmount, getLineTotalWithTax, getRemainingAmount, getRemainingPercentage, getTotalAmounts, getTotalPercentages, hasNegativeAmounts, sumTotalCost, sumTotalItems } from './cartUtils';

// test data
const CL = {
  id: "658",
  cartId: "770",
  itemId: "",
  description: "",
  categoryId: "1",
  uom: "EACH",
  quantity: 1,
  price: 34,
  cartLineAccounts: [],
  createdAt: "1617343222075",
  updatedAt: "1617343223547",
} as CartLine;

const CLA = {
  id: "112",
  amount: 34,
  accountNumber: "68196-702",
  cartLineId: "658",
  createdAt: "1617343226465",
  updatedAt: "1617343226465",
} as CartLineAccount;

// -------------------
describe('Cart Utils UNIT TESTS', () => {
  it('can compute percentage - 100%', () => {
    const result = computePercentageGivenAmount(CLA, CL);
    expect(result).toEqual(100);
  });

  it('can compute percentage - 50%', () => {
    const cla_clone = JSON.parse(JSON.stringify(CLA));
    cla_clone.amount = 17;
    const result = computePercentageGivenAmount(cla_clone, CL);
    expect(result).toEqual(50);
  });

  it('can get total percentages - 0% (no CLAs)', () => {
    const result = getTotalPercentages(CL);
    expect(result).toEqual(0);
  });

  it('can get total percentages - 75%', () => {
    const ANOTHER_CLA = {
      id: "113",
      amount: 17,
      accountNumber: "68196-703",
      cartLineId: "658",
      createdAt: "1617343226460",
      updatedAt: "1617343226460",
    } as CartLineAccount;
    const YET_ANOTHER_CLA = {
      id: "114",
      amount: 8.5,
      accountNumber: "68196-703",
      cartLineId: "658",
      createdAt: "1617343226460",
      updatedAt: "1617343226460",
    } as CartLineAccount;

    // setup
    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.cartLineAccounts = [ANOTHER_CLA, YET_ANOTHER_CLA];

    // action
    const result = getTotalPercentages(cl_clone);

    // expect
    expect(result).toEqual(75);
  });

  it('can get remaining percentages - 100 (no CLAs)', () => {
    const result = getRemainingPercentage(CL);
    expect(result).toEqual(100);
  });

  it('can get remaining percentages - 25%', () => {
    const ANOTHER_CLA = {
      id: "113",
      amount: 25.5,
      accountNumber: "68196-703",
      cartLineId: "658",
      createdAt: "1617343226460",
      updatedAt: "1617343226460",
    } as CartLineAccount;

    // setup
    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.cartLineAccounts = [ANOTHER_CLA];

    // action
    const result = getRemainingPercentage(cl_clone);

    // expect
    expect(result).toEqual(25);
  });

  it('🐞 BUG FIX: getting wrong remaining percentage', () => {
    const inputCartLine = {
      id: "665",
      cartId: "770",
      itemId: "",
      description: "",
      categoryId: "1",
      uom: "EACH",
      quantity: 1,
      price: 34,
      cartLineAccounts: [
        {
          id: "118",
          amount: 34,
          accountNumber: "63187-063",
          cartLineId: "665",
          createdAt: "1617347606773",
          updatedAt: "1617347606773",
        }
      ],
      createdAt: "1617347597465",
      updatedAt: "1617347604522",
    } as CartLine;
    const result = getRemainingPercentage(inputCartLine);
    expect(result).toEqual(0);
  });

  it('can sum Total Items', () => {

    const cart = {
      id: "N/A",
      cartLines: [CL]
    } as Cart;
    let result = sumTotalItems(cart);
    expect(result).toEqual(1);
    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.quantity = 7;
    cart.cartLines.push(cl_clone);
    result = sumTotalItems(cart);
    expect(result).toEqual(8);
  });

  it('can sum Total Cost', () => {

    const cart = {
      id: "N/A",
      cartLines: [CL]
    } as Cart;
    let result = sumTotalCost(cart);
    expect(result).toEqual(34);
    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.quantity = 7;
    cart.cartLines.push(cl_clone);
    result = sumTotalCost(cart);
    expect(result).toEqual(272);
  });

  it('can get Remaining Amount', () => {

    let result = getRemainingAmount(CL);
    expect(result).toEqual(34);

    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.cartLineAccounts.push(CLA);
    result = getRemainingAmount(cl_clone);
    expect(result).toEqual(0);
  });

  it('can get Line Total With Tax', () => {

    let result = getLineTotalWithTax(CL.price, CL.quantity, 0);
    expect(result).toEqual(34);

    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.quantity = 5;
    result = getLineTotalWithTax(cl_clone.price, cl_clone.quantity, 0);
    expect(result).toEqual(170);
  });

  it('can get Total Amounts', () => {

    let result = getTotalAmounts([CLA]);
    expect(result).toEqual(34);

    const cla_clone = JSON.parse(JSON.stringify(CLA));
    cla_clone.amount = 5;
    result = getTotalAmounts([CLA, cla_clone])
    expect(result).toEqual(39);
  });

  it('can compute Amount Given Percentage', () => {

    let result = computeAmountGivenPercentage({
      linePrice: CL.price,
      lineQuantity: CL.quantity,
      lineTax: 0,
      lineAccountPercentage: 50
    });
    expect(result).toEqual(17);

    result = computeAmountGivenPercentage({
      linePrice: 0,
      lineQuantity: CL.quantity,
      lineTax: 0,
      lineAccountPercentage: 50
    });
    expect(result).toEqual(0);
  });

  it('can check if has Negative Amounts', () => {

    let result = hasNegativeAmounts(CL);
    expect(result).toEqual(false);

    const cla_clone = JSON.parse(JSON.stringify(CLA));
    cla_clone.amount = -5;
    result = hasNegativeAmounts({ cartLineAccounts: [CLA, cla_clone] } as CartLine)
    expect(result).toEqual(true);
  });

  it('can check if Line Accounts are Valid', () => {

    let result = areLineAccountsValid(CL);
    expect(result).toEqual(false);

    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.cartLineAccounts = [CLA];
    result = areLineAccountsValid(cl_clone);
    expect(result).toEqual(true);

    const cla_clone = JSON.parse(JSON.stringify(CLA));
    cla_clone.amount = -5;
    cl_clone.cartLineAccounts.push(cla_clone);
    result = areLineAccountsValid(cl_clone);
    expect(result).toEqual(false);

  });

});
