import React from 'react';
import Header from './Header';
import ResourcePlan from './ResourcePlan';
import ResourcePlanStore from '../stores/ResourcePlanStore';

class ResourcePlans extends React.Component {

  constructor(props) {
    super(props);

    let data = ResourcePlanStore.getAll();

    this.state = {
      data: data,
      startDate: props.startDate,
      numberOfWeeks: data[0].allocations.length
    };

    this._onResourcePlanChange = this._onResourcePlanChange.bind(this);
  }

  componentDidMount() {
    ResourcePlanStore.addChangeListener(this._onResourcePlanChange);
  }

  componentWillUnmount() {
    ResourcePlanStore.removeChangeListener(this._onResourcePlanChange);
  }

  _onResourcePlanChange() {
    this.setState(ResourcePlanStore.getAll());
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
  startDate: React.PropTypes.instanceOf(Date)
};

export default ResourcePlans;
