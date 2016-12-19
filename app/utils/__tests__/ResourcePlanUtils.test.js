import moment from 'moment';
import {calculateWeeks, summarizeByWeek, summarizeByMonth} from '../ResourcePlanUtils';

test('weeks should be calculated', () => {
  const startDate = new Date('December 7, 2016');
  const numberOfWeeks = 3;
  const expectedWeeks = [
    {weekStarting: moment('2016-12-04'), weekEnding: moment('2016-12-10')},
    {weekStarting: moment('2016-12-11'), weekEnding: moment('2016-12-17')},
    {weekStarting: moment('2016-12-18'), weekEnding: moment('2016-12-24')}
  ]

  const weeks = calculateWeeks(startDate, numberOfWeeks);
  weeks.forEach((week, idx) => {
    expect(week.weekStarting.isSame(expectedWeeks[idx].weekStarting, 'day')).toBeTruthy();
    expect(week.weekEnding.isSame(expectedWeeks[idx].weekEnding, 'day')).toBeTruthy();
  });
});

test('resource plans should be summarized by week', () => {
  const weeks = [
    {weekStarting: moment('2016-12-04'), weekEnding: moment('2016-12-10')},
    {weekStarting: moment('2016-12-11'), weekEnding: moment('2016-12-17')},
    {weekStarting: moment('2016-12-18'), weekEnding: moment('2016-12-24')},
    {weekStarting: moment('2016-12-25'), weekEnding: moment('2016-12-30')}
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
    expect(week).toBe(expectedTotals[weekId]);
  });
});

test('resource plans should be summarized by month', () => {
  const weeks = [
    {weekStarting: moment('2016-12-11'), weekEnding: moment('2016-12-17')},
    {weekStarting: moment('2016-12-18'), weekEnding: moment('2016-12-24')},
    {weekStarting: moment('2016-12-25'), weekEnding: moment('2016-12-30')},
    {weekStarting: moment('2017-01-01'), weekEnding: moment('2017-01-07')}
  ];
  const resourcePlans = [
    {name: 'Dev Lead', allocations: [20, 20, 20, 20]},
    {name: 'Sr Developer', allocations: [40, 40, 40, 40]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 20]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 20]}
  ];

  const monthlyTotals = summarizeByMonth(weeks, resourcePlans);
  console.log(monthlyTotals);
});
