import React from 'react';

class WeeklyAllocation extends React.Component {
  constructor(props) {
    super(props);

    this.handleHoursChanged = this.handleHoursChanged.bind(this);
  }

  handleHoursChanged(e) {
    console.log('hours changed');
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
  hours: React.PropTypes.number.isRequired
};

export default WeeklyAllocation;
