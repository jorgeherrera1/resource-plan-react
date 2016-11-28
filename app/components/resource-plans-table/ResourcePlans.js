import React from 'react';
import WeeklyHeader from './WeeklyHeader';
import TotalsFooter from './TotalsFooter';
import ResourcePlan from './ResourcePlan';
import ResourcePlanActions from '../../actions/ResourcePlanActions';

class ResourcePlans extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddWeek = this.handleAddWeek.bind(this);
  }

  handleAddWeek(e) {
    ResourcePlanActions.addWeek();
  }

  handleAddResource(e) {
    ResourcePlanActions.addResource();
  }

  render() {
    const numberOfWeeks = this.props.resourcePlans[0].allocations.length;

    let resourcePlanElements = this.props.resourcePlans.map(function(rp, idx) {
      return (
        <ResourcePlan
          id={idx}
          name={rp.name}
          allocations={rp.allocations}
          key={idx} />
      );
    });

    return (
      <div className="rp-resource-plans">
        <button
          onClick={this.handleAddWeek} className="c-btn c-btn--primary">Add Week</button>
        &nbsp;&nbsp;&nbsp;
        <button
          onClick={this.handleAddResource} className="c-btn c-btn--primary">Add Resource</button>
        <table className="c-table rp-resource-plan-table">
          <thead>
            <WeeklyHeader
              numberOfWeeks={numberOfWeeks}
              startDate={this.props.startDate} />
          </thead>
          <tfoot>
            <TotalsFooter numberOfWeeks={numberOfWeeks} data={this.props.resourcePlans} />
          </tfoot>
          <tbody>
            {resourcePlanElements}
          </tbody>
        </table>
      </div>
    );
  }
}

ResourcePlans.propTypes = {
  startDate: React.PropTypes.instanceOf(Date),
  resourcePlans: React.PropTypes.array
};

export default ResourcePlans;
