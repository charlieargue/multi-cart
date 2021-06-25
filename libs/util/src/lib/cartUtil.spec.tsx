import { CartLine, CartLineAccount } from '@multi-cart/react-data-access';
import { computePercentageGivenAmount, getRemainingPercentage, getTotalPercentages } from './cartUtils';

// KISS test data
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


});
