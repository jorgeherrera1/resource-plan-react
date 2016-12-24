import React from 'react';
import WeeklyAllocation from './WeeklyAllocation';
import ResourcePlanActions from '../../actions/ResourcePlanActions';

class ResourcePlan extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleWeeklyAllocationChanged = this.handleWeeklyAllocationChanged.bind(this);
  }

  handleNameChanged(e) {
    let newName = e.target.value;
    ResourcePlanActions.updateResourceName(this.props.id, newName);
  }

  handleWeeklyAllocationChanged(weekId, hours) {
    ResourcePlanActions.updateWeeklyAllocation(this.props.id, weekId, hours);
  }

  render() {
    let that = this;

    let allocationElements = this.props.allocations.map((hours, idx) => {
      return (
        <WeeklyAllocation
          key={idx}
          weekId={idx}
          hours={hours}
          onWeeklyAllocationChange={that.handleWeeklyAllocationChanged}
        />
      );
    });

    let totalHours = this.props.allocations.reduce((previousHours, currentHours) => {
      return previousHours + currentHours;
    });

    return (
      <tr>
        <td>{this.props.id + 1}</td>
        <td>
          <input type="text"
            value={this.props.name}
            onChange={this.handleNameChanged}/>
        </td>
        {allocationElements}
        <td className="center-align"><strong>{totalHours}</strong></td>
        <td>
          <button className="btn-floating waves-effect waves-light indigo darken-2 left-align">
            <i className="material-icons">account_circle</i>
          </button>&nbsp;
          <button className="btn-floating waves-effect waves-light red left-align">
            <i className="material-icons">remove</i>
          </button>
        </td>
      </tr>
    );
  }
}

ResourcePlan.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  allocations: React.PropTypes.array
};

export default ResourcePlan;
