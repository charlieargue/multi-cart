import { roundToTwo } from "./roundToTwo";

// -------------------
describe('Round To Two UNIT TESTS', () => {
  it('roundToTwo working as expected', () => {
    const result = roundToTwo(1.23445);  
    expect(result).toEqual(1.23);
  });


});
