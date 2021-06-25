import { toDaysAgo } from './toDaysAgo';

// -------------------
describe('To Days Ago UNIT TESTS', () => {
  it('toDaysAgo conversion working as expected', () => {
    const dateObj = new Date();

    // generate todays UTC date like DynamoDB does: `2021-05-26T18:20:52.836Z`
    const month = (dateObj.getUTCMonth() + 1).toString(); //months from 1-12.
    const hour = dateObj.getUTCHours().toString();
    const minute = dateObj.getUTCMinutes().toString();
    const second = dateObj.getUTCSeconds().toString();
    const millisecond = dateObj.getUTCMilliseconds().toString();
    const day = dateObj.getUTCDate().toString();
    const year = dateObj.getUTCFullYear().toString();

    const padIfOneDigit = (s: string): string => {
      if(s.length === 1) return `0${s}`;
      return s;
    };
      
    const input = `${year}-${padIfOneDigit(month)}-${padIfOneDigit(day)}T${padIfOneDigit(hour)}:${padIfOneDigit(minute)}:${padIfOneDigit(second)}.${millisecond}Z`;
    const output = toDaysAgo(input);
    expect(output).toContain("less than a minute");
  });



});
