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
  let weeklyTotals = [];

  weeks.forEach((week, weekId) => {
    weeklyTotals[weekId] = Object.assign({totalHours: 0}, week);

    resourcePlans.forEach((resourcePlan) => {
      weeklyTotals[weekId].totalHours += resourcePlan.allocations[weekId];
    });
  });

  return weeklyTotals;
}

export function summarizeByMonth(weeks, resourcePlans) {
  const weeklyTotals = summarizeByWeek(weeks, resourcePlans);
  let monthlyTotals = Immutable.OrderedMap();
  weeklyTotals.forEach((week, weekId) => {
    const hoursByDay = week.totalHours / 5;
    const start = moment(week.weekStarting).day('Monday');
    const end = moment(week.weekEnding).day('Friday');

    moment.range(start, end).by('days', (day) => {
      const month = day.format('MMMM');
      monthlyTotals = monthlyTotals.set(month, monthlyTotals.get(month, 0) + hoursByDay);
    });
  });

  return monthlyTotals.toArray();
}
