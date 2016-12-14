import {calculateWeeks, summarizeByMonth} from '../ResourcePlanUtils';

test('weeks should be calculated', () => {
  let startDate = new Date('December 7, 2016');
  let numberOfWeeks = 3;

  expect(calculateWeeks(startDate, numberOfWeeks)).toEqual([
    {weekStarting: '04-Dec-2016', weekEnding: '10-Dec-2016'},
    {weekStarting: '11-Dec-2016', weekEnding: '17-Dec-2016'},
    {weekStarting: '18-Dec-2016', weekEnding: '24-Dec-2016'}
  ]);
});

test('resource plans should be summarized by month', () => {
  const startDate = new Date('December 13, 2016');
  const resourcePlans = [
    {name: 'Dev Lead', allocations: [20, 20, 20, 20]},
    {name: 'Sr Developer', allocations: [40, 40, 40, 40]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 20]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 20]}
  ];

  const hoursByMonth = summarizeByMonth(startDate, resourcePlans);
  
  expect(Object.keys(hoursByMonth)).toEqual(['December', 'January']);
  expect(hoursByMonth['December']).toBe(380);
  expect(hoursByMonth['January']).toBe(100);
});
