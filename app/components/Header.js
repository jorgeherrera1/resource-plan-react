import React from 'react';
import moment from 'moment';
import 'moment-range';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate,
      numberOfWeeks: props.numberOfWeeks
    };

    console.log(this.state);
  }

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
    let start = moment(this.state.startDate).startOf('week');
    let end = start.clone()
                   .add(this.state.numberOfWeeks - 1, 'weeks')
                   .endOf('week');
    let range = moment.range(start, end);
    let weeks = [];

    range.by('weeks', function(week) {
      weeks.push(
        <th key={weeks.length} className="rp-week-col u-font-center">
          {week.format('DD-MMM-YYYY')}
          <br/>
          {week.format('DD-MMM-YYYY')}
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
