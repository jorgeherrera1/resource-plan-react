import moment from 'moment';
import 'moment-range';

export function calculateWeeks(startDate, numberOfWeeks) {
  // moments and dates are mutable so we clone start date
  let start = moment(startDate).startOf('week'),
      end = moment(startDate).add(numberOfWeeks - 1, 'weeks').endOf('week');

  let weeks = [];

  moment.range(start, end).by('weeks', (week) => {
    let weekStarting = week.format('DD-MMM-YYYY'),
        weekEnding = week.endOf('week').format('DD-MMM-YYYY');

    weeks.push({weekStarting, weekEnding});
  });

  return weeks;
}
