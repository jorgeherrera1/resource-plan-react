import React from 'react';
import Header from './Header';
import ResourcePlan from './ResourcePlan';

class ResourcePlans extends React.Component {

  render() {
    var startDate = new Date();
    var numberOfWeeks = this.props.data[0].allocations.length;

    var resourcePlanElements = this.props.data.map(function(rp, idx) {
      return (
        <ResourcePlan id={rp.id}
          name={rp.name}
          allocations={rp.allocations}
          key={rp.id} />
      );
    });

    return (
      <table className="c-table">
        <thead>
          <Header numberOfWeeks={numberOfWeeks} startDate={startDate} />
        </thead>
        <tbody>
          {resourcePlanElements}
        </tbody>
      </table>
    );
  }
}

ResourcePlans.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default ResourcePlans;
