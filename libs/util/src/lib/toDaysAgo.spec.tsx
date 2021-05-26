import { toDaysAgo } from '@multi-cart/util';

// -------------------
describe('To Days Ago UNIT TESTS', () => {
  it('toDaysAgo conversion working as expected', () => {
    const dateObj = new Date();

    // generate todays UTC date like DynamoDB does: `2021-05-26T18:20:52.836Z`
    let month = (dateObj.getUTCMonth() + 1).toString(); //months from 1-12.
    if(month.length === 1) {
      month = `0${month}`;
    }
    
    const hour = dateObj.getUTCHours().toString()
    const minute = dateObj.getUTCMinutes().toString();
    const second = dateObj.getUTCSeconds().toString();
    const millisecond = dateObj.getUTCMilliseconds().toString();
    const day = dateObj.getUTCDate().toString();
    const year = dateObj.getUTCFullYear().toString();
      
    const input = `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
    const output = toDaysAgo(input);
    expect(output).toContain("less than a minute ago");
  });



});
