import React from 'react';
import moment from 'moment';
import 'moment-range';

class Header extends React.Component {

  render() {
    let weeks = this._renderWeeks();

    return (
      <tr>
        <th className="rp-resource-id-col">#</th>
        <th className="rp-resource-name-col">Resource</th>
        {weeks}
        <th className="u-font-center">Total</th>
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
        <div className="c-card c-card--arrow rp-add-remove-week-tooltip">
          <button className="c-btn c-btn--primary c-btn--full">
            Add Week
          </button>
          <button className="c-btn c-btn--tertiary c-btn--full">
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

Header.propTypes = {
  startDate: React.PropTypes.instanceOf(Date),
  numberOfWeeks: React.PropTypes.number.isRequired
};

export default Header;
