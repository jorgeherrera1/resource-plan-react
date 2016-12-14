import moment from 'moment';
import 'moment-range';

export function calculateWeeks(startDate, numberOfWeeks) {
  // moments and dates are mutable so we clone start date
  let start = moment(startDate).startOf('week');
  let end = moment(startDate).add(numberOfWeeks - 1, 'weeks').endOf('week');

  let weeks = [];

  moment.range(start, end).by('weeks', (week) => {
    let weekStarting = week.format('DD-MMM-YYYY');
    let weekEnding = week.endOf('week').format('DD-MMM-YYYY');

    weeks.push({weekStarting, weekEnding});
  });

  return weeks;
}

export function summarizeByMonth(startDate, resourcePlans) {
  const numberOfWeeks = resourcePlans[0].allocations.length;
  const weeks = calculateWeeks(startDate, numberOfWeeks);

  let totalHoursByMonth = {};

  resourcePlans.forEach((resourcePlan) => {
    resourcePlan.allocations.reduce((resourceHoursByMonth, weekHours, weekId) => {
      const hoursByDay = weekHours / 5;
      const start = moment(weeks[weekId].weekStarting, 'DD-MMM-YYYY').day('Monday');
      const end = moment(weeks[weekId].weekEnding, 'DD-MMM-YYYY').day('Friday');

      moment.range(start, end).by('days', (day) => {
        const month = day.format('MMMM');
        resourceHoursByMonth[month] = (resourceHoursByMonth[month] + hoursByDay) || hoursByDay;
      });

      return resourceHoursByMonth;
    }, totalHoursByMonth);
  });

  return totalHoursByMonth;
}
