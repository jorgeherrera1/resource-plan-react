import React from 'react';

class WeeklyAllocation extends React.Component {
  constructor(props) {
    super(props);

    this.hoursChanged = this.hoursChanged.bind(this);
  }

  hoursChanged(e) {
    console.log('hours changed');
  }

  render() {
    return (
      <td>
        <input type="text" className="c-input"
          value={this.props.hours}
          onChange={this.hoursChanged} />
      </td>
    );
  }
}

WeeklyAllocation.propTypes = {
  hours: React.PropTypes.number.isRequired
};

export default WeeklyAllocation;
