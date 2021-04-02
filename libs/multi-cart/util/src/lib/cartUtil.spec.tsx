import {
  getRemainingPercentage,
  getTotalPercentages,
  computePercentage
} from '@multi-cart/multi-cart/util';
import { CartLine, CartLineAccount } from '@multi-cart/react-data-access';

// KISS test data
const CL = {
  "id": 658,
  "cartId": 770,
  "itemId": "",
  "description": "",
  "categoryId": 1,
  "uom": "EACH",
  "quantity": 1,
  "price": 34,
  "cartLineAccounts": [],
  "createdAt": "1617343222075",
  "updatedAt": "1617343223547",
  "__typename": "CartLine"
} as CartLine;

const CLA = {
  "id": 112,
  "amount": 34,
  "accountNumber": "68196-702",
  "cartLineId": 658,
  "createdAt": "1617343226465",
  "updatedAt": "1617343226465",
  "__typename": "CartLineAccount"
} as CartLineAccount;


// -------------------
describe('Cart Utils', () => {
  it('can compute percentage - 100%', () => {
    const result = computePercentage(CLA, CL);
    expect(result).toEqual(100);
  });

  it('can compute percentage - 50%', () => {
    const cla_clone = JSON.parse(JSON.stringify(CLA));
    cla_clone.amount = 17;
    const result = computePercentage(cla_clone, CL);
    expect(result).toEqual(50);
  });
  it('can get total percentages - 0%', () => {
    const result = getTotalPercentages(CL);
    expect(result).toEqual(0);
  });

  it('can get total percentages - 75%', () => {
    const ANOTHER_CLA = {
      "id": 113,
      "amount": 17,
      "accountNumber": "68196-703",
      "cartLineId": 658,
      "createdAt": "1617343226460",
      "updatedAt": "1617343226460",
      "__typename": "CartLineAccount"
    } as CartLineAccount;
    const YET_ANOTHER_CLA = {
      "id": 114,
      "amount": 8.5,
      "accountNumber": "68196-703",
      "cartLineId": 658,
      "createdAt": "1617343226460",
      "updatedAt": "1617343226460",
      "__typename": "CartLineAccount"
    } as CartLineAccount;


    // setup
    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.cartLineAccounts = [ANOTHER_CLA, YET_ANOTHER_CLA];

    // action
    const result = getTotalPercentages(cl_clone);

    // expect
    expect(result).toEqual(75);
  });

  it.only('can get remaining percentages - 0', () => {
    const result = getRemainingPercentage(CL);
    expect(result).toEqual(100);
  });

  it.only('can get remaining percentages - 25%', () => {
    const ANOTHER_CLA = {
      "id": 113,
      "amount": 25.5,
      "accountNumber": "68196-703",
      "cartLineId": 658,
      "createdAt": "1617343226460",
      "updatedAt": "1617343226460",
      "__typename": "CartLineAccount"
    } as CartLineAccount;

    // setup
    const cl_clone = JSON.parse(JSON.stringify(CL));
    cl_clone.cartLineAccounts = [ANOTHER_CLA];

    // action
    const result = getRemainingPercentage(cl_clone);

    // expect
    expect(result).toEqual(25);
  });


});
