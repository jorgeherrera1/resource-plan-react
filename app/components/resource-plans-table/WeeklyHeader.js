import React from 'react';
import moment from 'moment';
import 'moment-range';

class WeeklyHeader extends React.Component {

  render() {
    let weeks = this._renderWeeks();

    return (
      <tr>
        <th className="rp-resource-id-col">#</th>
        <th className="rp-resource-name-col">Resource</th>
        {weeks}
        <th className="rp-resource-totals-col">Total</th>
      </tr>
    );
  }

  _renderWeeks() {
    let start = moment(this.props.startDate).startOf('week');
    let end = start.clone()
                   .add(this.props.numberOfWeeks - 1, 'weeks')
                   .endOf('week');
    let range = moment.range(start, end);
    let weeks = [];

    range.by('weeks', function(weekStarting) {
      let weekEnding = weekStarting.clone().endOf('week');
      let weekHeaderCss = 'rp-week-col u-font-center';

      let addRemoveWeekTooltip;
      if (weekEnding.isSame(end)) {
        weekHeaderCss += ' rp-week-last-col';
        addRemoveWeekTooltip =
        <div className="rp-add-remove-week-tooltip">
          <button>
            Add Week
          </button>
          <button>
            Remove Week
          </button>
        </div>;
      }

      weeks.push(
        <th key={weeks.length} className={weekHeaderCss}>
          {weekStarting.format('DD-MMM-YYYY')}
          <br/>
          {weekEnding.format('DD-MMM-YYYY')}
          <br/>
          {addRemoveWeekTooltip}
        </th>
      );
    });

    return weeks;
  }
}

WeeklyHeader.propTypes = {
  startDate: React.PropTypes.instanceOf(Date),
  numberOfWeeks: React.PropTypes.number
};

export default WeeklyHeader;
