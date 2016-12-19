import React from 'react';

class WeeklyHeader extends React.Component {

  render() {
    const weeks = this.props.weeks.map((week, idx) => {
      const {weekStarting, weekEnding} = week;

      return (
        <th key={idx} className="rp-week-col center-align">
          {weekStarting.format('DD-MMM-YYYY')}
          <br/>
          {weekEnding.format('DD-MMM-YYYY')}
        </th>
      );
    });

    return (
      <tr>
        <th className="rp-resource-id-col">#</th>
        <th className="rp-resource-name-col">Resource</th>
        {weeks}
        <th className="rp-resource-totals-col center-align">Total</th>
      </tr>
    );
  }

}

WeeklyHeader.propTypes = {
  weeks: React.PropTypes.array
};

export default WeeklyHeader;
