import React from 'react';
import WeeklyAllocation from './WeeklyAllocation';

class ResourcePlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name,
      allocations: props.allocations
    };

    this.nameChanged = this.nameChanged.bind(this);
  }

  nameChanged(e) {
    this.setState({
      name: e.target.value
    });
  }

  allocationChanged(idx, hours) {
    var allocations = this.state.allocations.slice();
    allocations[idx] = hours;

    this.setState({
      allocations: allocations
    });
  }

  render() {
    var allocationElements = this.props.allocations.map(function(hours, idx) {
      return (
        <WeeklyAllocation hours={hours} key={idx}/>
      );
    });

    return (
      <tr>
        <td>{this.state.id}</td>
        <td>
          <input type="text" className="c-input"
            value={this.state.name}
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
