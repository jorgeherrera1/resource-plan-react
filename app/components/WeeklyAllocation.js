import React from 'react';

class WeeklyAllocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weekId: props.weekId
    };

    this.handleHoursChanged = this.handleHoursChanged.bind(this);
  }

  handleHoursChanged(e) {
    let hours = e.target.value.trim();
    this.props.onWeeklyAllocationChange(this.state.weekId, hours);
  }

  render() {
    return (
      <td>
        <input type="text" className="c-input"
          value={this.props.hours}
          onChange={this.handleHoursChanged} />
      </td>
    );
  }
}

WeeklyAllocation.propTypes = {
  weekId: React.PropTypes.number.isRequired,
  hours: React.PropTypes.number.isRequired,
  onWeeklyAllocationChange: React.PropTypes.func
};

export default WeeklyAllocation;
