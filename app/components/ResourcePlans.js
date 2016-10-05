import React from 'react';
import Header from './Header';
import ResourcePlan from './ResourcePlan';

class ResourcePlans extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      startDate: props.startDate,
      numberOfWeeks: props.data[0].allocations.length
    };
  }

  render() {
    let resourcePlanElements = this.state.data.map(function(rp, idx) {
      return (
        <ResourcePlan
          id={rp.id}
          name={rp.name}
          allocations={rp.allocations}
          key={rp.id} />
      );
    });

    return (
      <table className="c-table">
        <thead>
          <Header
            numberOfWeeks={this.state.numberOfWeeks}
            startDate={this.state.startDate} />
        </thead>
        <tbody>
          {resourcePlanElements}
        </tbody>
      </table>
    );
  }
}

ResourcePlans.propTypes = {
  data: React.PropTypes.array.isRequired,
  startDate: React.PropTypes.instanceOf(Date)
};

export default ResourcePlans;
