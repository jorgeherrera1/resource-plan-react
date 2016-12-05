import {calculateWeeks} from '../ResourcePlanUtils';

test('weeks should be calculated', () => {
  let startDate = new Date('December 7, 2016');
  let numberOfWeeks = 3;

  expect(calculateWeeks(startDate, numberOfWeeks)).toEqual([
    {weekStarting: '04-Dec-2016', weekEnding: '10-Dec-2016'},
    {weekStarting: '11-Dec-2016', weekEnding: '17-Dec-2016'},
    {weekStarting: '18-Dec-2016', weekEnding: '24-Dec-2016'}
  ]);
});
