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
    const resourcePlanElements = this.props.resourcePlans.map(function(rp, idx) {
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
          onClick={this.handleAddWeek} className="waves-effect waves-light btn">
          Add Week
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          onClick={this.handleAddResource} className="waves-effect waves-light btn">
          Add Resource
        </button>
        <table className="highlight rp-resource-plan-table">
          <thead>
            <WeeklyHeader
              weeks={this.props.weeks} />
          </thead>
          <tfoot>
            <TotalsFooter numberOfWeeks={this.props.numberOfWeeks} data={this.props.resourcePlans} />
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
  numberOfWeeks: React.PropTypes.number,
  weeks: React.PropTypes.array,
  resourcePlans: React.PropTypes.array
};

export default ResourcePlans;
