import moment from 'moment';
import 'moment-range';

export function xyz(startDate, numberOfWeeks) {
  // moments and dates are mutable so we clone start date
  let start = moment(startDate).startOf('week'),
      end = moment(startDate).add(numberOfWeeks - 1, 'weeks').endOf('week');

  moment.range(start, end).by('weeks', (data) => {
    console.log(data);
  });

  return 3;
}
