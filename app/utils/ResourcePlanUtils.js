import Immutable from 'immutable';
import moment from 'moment';
import 'moment-range';

export function calculateWeeks(startDate, numberOfWeeks) {
  // moments and dates are mutable so we clone start date
  const start = moment(startDate).startOf('week');
  const end = moment(startDate).add(numberOfWeeks - 1, 'weeks').endOf('week');

  let weeks = [];

  moment.range(start, end).by('weeks', (week) => {
    const weekStarting = week.clone();
    const weekEnding = week.clone().endOf('week');

    weeks.push({weekStarting, weekEnding});
  });

  return weeks;
}

export function summarizeByWeek(weeks, resourcePlans) {
  let weeklyTotals = new Array(weeks.length).fill(0);

  weeks.forEach((week, weekId) => {
    resourcePlans.forEach((resourcePlan) => {
      weeklyTotals[weekId] += resourcePlan.allocations[weekId];
    });
  });

  return weeklyTotals;
}

export function summarizeByMonth(weeks, resourcePlans) {
  const weeklyTotals = summarizeByWeek(weeks, resourcePlans);
  let monthlyTotals = Immutable.OrderedMap();
  weeklyTotals.forEach((weekTotal, weekId) => {
    const hoursByDay = weekTotal / 5;
    const start = moment(weeks[weekId].weekStarting).day('Monday');
    const end = moment(weeks[weekId].weekEnding).day('Friday');

    moment.range(start, end).by('days', (day) => {
      const month = day.format('MMMM');
      monthlyTotals = monthlyTotals.set(month, monthlyTotals.get(month, 0) + hoursByDay);
    });
  });

  return monthlyTotals.toArray();
}
