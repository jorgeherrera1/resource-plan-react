import React from 'react';
import WeeklyAllocation from './WeeklyAllocation';
import ResourcePlanActions from '../actions/ResourcePlanActions';

class ResourcePlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name
    };

    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleWeeklyAllocationChanged = this.handleWeeklyAllocationChanged.bind(this);
  }

  handleNameChanged(e) {
    let newName = e.target.value.trim();
    ResourcePlanActions.updateResourceName(1, newName);
    this.setState({
      name: newName
    });
  }

  handleWeeklyAllocationChanged(weekId, hours) {
    ResourcePlanActions.updateWeeklyAllocation(this.state.id, weekId, hours);
  }

  render() {
    let that = this;

    let allocationElements = this.props.allocations.map(function(hours, idx) {
      return (
        <WeeklyAllocation
          key={idx}
          weekId={idx}
          hours={hours}
          onWeeklyAllocationChange={that.handleWeeklyAllocationChanged}
        />
      );
    });

    return (
      <tr>
        <td>{this.state.id}</td>
        <td>
          <input type="text" className="c-input"
            value={this.state.name}
            onChange={this.handleNameChanged}/>
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
