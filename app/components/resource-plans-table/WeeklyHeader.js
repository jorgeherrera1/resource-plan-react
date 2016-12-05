import React from 'react';
import {calculateWeeks} from '../../utils/ResourcePlanUtils';

class WeeklyHeader extends React.Component {

  render() {
    let weeks = this._renderWeeks();

    return (
      <tr>
        <th className="rp-resource-id-col">#</th>
        <th className="rp-resource-name-col">Resource</th>
        {weeks}
        <th className="rp-resource-totals-col center-align">Total</th>
      </tr>
    );
  }

  _renderWeeks() {
    let weeks = calculateWeeks(this.props.startDate, this.props.numberOfWeeks);

    return weeks.map((week, idx) => {
      let {weekStarting, weekEnding} = week;

      return (
        <th key={idx} className="rp-week-col center-align">
          {weekStarting}
          <br/>
          {weekEnding}
        </th>
      );
    });
  }
}

WeeklyHeader.propTypes = {
  startDate: React.PropTypes.instanceOf(Date),
  numberOfWeeks: React.PropTypes.number
};

export default WeeklyHeader;
