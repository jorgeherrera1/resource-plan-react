import React from 'react';

class WeeklyAllocation extends React.Component {
  constructor(props) {
    super(props);

    this.handleHoursChanged = this.handleHoursChanged.bind(this);
  }

  handleHoursChanged(e) {
    let hours = Number(e.target.value);

    if (isNaN(hours)) {
      return;
    }

    this.props.onWeeklyAllocationChange(this.props.weekId, hours);
  }

  render() {
    return (
      <td>
        <input type="text" className="center-align"
          value={this.props.hours}
          onChange={this.handleHoursChanged} />
      </td>
    );
  }
}

WeeklyAllocation.propTypes = {
  weekId: React.PropTypes.number,
  hours: React.PropTypes.number,
  onWeeklyAllocationChange: React.PropTypes.func
};

export default WeeklyAllocation;
