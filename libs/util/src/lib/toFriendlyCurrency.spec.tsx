import { toFriendlyCurrency } from "./toFriendlyCurrency";

// -------------------
describe('Conversion To Friendly Currency UNIT TESTS', () => {
  it('toFriendlyCurrency working as expected', () => {
    let result = toFriendlyCurrency(1.23445);
    expect(result).toEqual("$1.23");

    result = toFriendlyCurrency(1.699445, true);
    expect(result).toEqual("1.70"); // ✅ 
    // expect(result).toEqual("1.71"); // 🔴 testing failure
  });


});
