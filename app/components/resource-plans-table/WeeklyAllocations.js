import React from 'react';
import ResourcePlanActions from '../../actions/ResourcePlanActions';
import {summarizeByWeek} from '../../utils/ResourcePlanUtils';

class WeeklyAllocations extends React.Component {

  handleWeeklyAllocationChanged(resourcePlanId, weekId, hours) {
    ResourcePlanActions.updateWeeklyAllocation(resourcePlanId, weekId, hours);
  }

  renderWeeks() {
    const weeks = this.props.weeks.map((week, weekId) => {
      const {weekStarting, weekEnding} = week;

      return (
        <th key={weekId} className="rp-week-col center-align">
          {weekStarting.format('DD-MMM-YYYY')}
          <br/>
          {weekEnding.format('DD-MMM-YYYY')}
        </th>
      );
    });

    return weeks;
  }

  renderWeeklyAllocations(resourcePlanId, allocations) {
    const weeklyAllocations = allocations.map((hours, weekId) => {
      return (
        <td key={weekId}>
          <input type="text" className="center-align"
            value={hours}
            onChange={(e) => {
              this.handleWeeklyAllocationChanged(resourcePlanId, weekId, e.target.value);
            }} />
        </td>
      );
    });

    return weeklyAllocations;
  }

  renderResourceAllocations() {
    const resourceAllocations = this.props.resourcePlans.map((resourcePlan, resourcePlanId) => {
      const {allocations} = resourcePlan;
      const weeklyAllocations = this.renderWeeklyAllocations(resourcePlanId, allocations);

      return (
        <tr key={resourcePlanId}>
          {weeklyAllocations}
        </tr>
      );
    });

    return resourceAllocations;
  }

  renderWeeklyTotals() {
    const weeklyTotals = summarizeByWeek(this.props.weeks, this.props.resourcePlans);

    return weeklyTotals.map((totalHours, weekId) => {
      return (
        <td key={weekId} className="center-align">
          <strong>{totalHours}</strong>
        </td>
      );
    });
  }

  render() {
    const weeks = this.renderWeeks();
    const resourceAllocations = this.renderResourceAllocations();
    const weeklyTotals = this.renderWeeklyTotals();

    return (
      <div className="rp-weekly-allocations">
        <table className="rp-table highlight">
          <thead>
            <tr>
              {weeks}
            </tr>
          </thead>
          <tfoot>
            <tr>
              {weeklyTotals}
            </tr>
          </tfoot>
          <tbody>
            {resourceAllocations}
          </tbody>
        </table>
      </div>
    );
  }
}

WeeklyAllocations.propTypes = {
  weeks: React.PropTypes.array,
  resourcePlans: React.PropTypes.array
};

export default WeeklyAllocations;
