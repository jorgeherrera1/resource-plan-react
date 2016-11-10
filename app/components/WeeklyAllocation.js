import React from 'react';

class WeeklyAllocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weekId: props.weekId,
      hours: props.hours
    };

    this.handleHoursChanged = this.handleHoursChanged.bind(this);
  }

  handleHoursChanged(e) {
    let hours = Number(e.target.value);

    if (isNaN(hours)) {
      return;
    }

    this.props.onWeeklyAllocationChange(this.state.weekId, hours);
    this.setState({
      hours: hours
    });
  }

  render() {
    return (
      <td>
        <input type="text" className="c-input u-font-center"
          value={this.state.hours}
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
