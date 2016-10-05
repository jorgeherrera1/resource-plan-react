import React from 'react';
import WeeklyAllocation from './WeeklyAllocation';

class ResourcePlan extends React.Component {
  constructor(props) {
    super(props);

    this.nameChanged = this.nameChanged.bind(this);
  }

  nameChanged(e) {
    console.log('name changed: ' + e.target.value);
  }

  render() {
    let allocationElements = this.props.allocations.map(function(hours, idx) {
      return (
        <WeeklyAllocation hours={hours} key={idx}/>
      );
    });

    return (
      <tr>
        <td>{this.props.id}</td>
        <td>
          <input type="text" className="c-input"
            value={this.props.name}
            onChange={this.nameChanged}/>
        </td>
        {allocationElements}
        <td>320</td>
      </tr>
    );
  }
}

ResourcePlan.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  allocations: React.PropTypes.array.isRequired
};

export default ResourcePlan;
