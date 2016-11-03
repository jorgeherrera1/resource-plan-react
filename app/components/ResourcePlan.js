import React from 'react';
import WeeklyAllocation from './WeeklyAllocation';
import ResourcePlanActions from '../actions/ResourcePlanActions';

class ResourcePlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name
    };
    this.nameChanged = this.nameChanged.bind(this);
  }

  nameChanged(e) {
    let newName = e.target.value.trim();
    ResourcePlanActions.updateResourceName(1, newName);
    this.setState({
      name: newName
    });
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
