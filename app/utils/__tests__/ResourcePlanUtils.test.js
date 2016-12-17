import {calculateWeeks, summarizeByWeek, summarizeByMonth} from '../ResourcePlanUtils';

test('weeks should be calculated', () => {
  let startDate = new Date('December 7, 2016');
  let numberOfWeeks = 3;

  expect(calculateWeeks(startDate, numberOfWeeks)).toEqual([
    {weekStarting: '04-Dec-2016', weekEnding: '10-Dec-2016'},
    {weekStarting: '11-Dec-2016', weekEnding: '17-Dec-2016'},
    {weekStarting: '18-Dec-2016', weekEnding: '24-Dec-2016'}
  ]);
});

test('resource plans should be summarized by week', () => {
  const weeks= [
    {weekStarting: '11-DEC-2016', weekEnding: '17-DEC-2016'},
    {weekStarting: '18-DEC-2016', weekEnding: '24-DEC-2016'},
    {weekStarting: '25-DEC-2016', weekEnding: '30-DEC-2016'},
    {weekStarting: '1-JAN-2017', weekEnding: '7-JAN-2017'}
  ];
  const resourcePlans = [
    {name: 'Dev Lead', allocations: [20, 20, 20, 20]},
    {name: 'Sr Developer', allocations: [40, 40, 40, 40]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 20]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 20]}
  ];

  const weeklyTotals = summarizeByWeek(weeks, resourcePlans);
  const expectedTotals = [140, 140, 100, 100];

  expect(weeklyTotals.length).toBe(weeks.length);
  weeklyTotals.forEach((week, weekId) => {
    expect(week.totalHours).toBe(expectedTotals[weekId]);
  });
});

// test('resource plans should be summarized by month', () => {
//   const startDate = new Date('December 13, 2016');
//   const resourcePlans = [
//     {name: 'Dev Lead', allocations: [20, 20, 20, 20]},
//     {name: 'Sr Developer', allocations: [40, 40, 40, 40]},
//     {name: 'Jr Developer', allocations: [40, 40, 20, 20]},
//     {name: 'Jr Developer', allocations: [40, 40, 20, 20]}
//   ];

//   const hoursByMonth = summarizeByMonth(startDate, resourcePlans);
//   const expectedMonths = ['December', 'January'];

//   expect(Object.keys(hoursByMonth)).toEqual(expectedMonths);
//   expect(hoursByMonth[expectedMonths[0]]).toBe(380);
//   expect(hoursByMonth[expectedMonths[1]]).toBe(100);
// });
