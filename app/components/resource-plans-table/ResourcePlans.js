import React from 'react';
import WeeklyHeader from './WeeklyHeader';
import TotalsFooter from './TotalsFooter';
import ResourcePlan from './ResourcePlan';
import ResourcePlanStore from '../../stores/ResourcePlanStore';
import ResourcePlanActions from '../../actions/ResourcePlanActions';

class ResourcePlans extends React.Component {

  constructor(props) {
    super(props);

    let data = ResourcePlanStore.getAll();

    this.state = {
      data: data,
      startDate: props.startDate
    };

    this.handleAddWeek = this.handleAddWeek.bind(this);
    this._onResourcePlanChange = this._onResourcePlanChange.bind(this);
  }

  handleAddWeek(e) {
    ResourcePlanActions.addWeek();
    this._onResourcePlanChange();
  }

  handleAddResource(e) {
    ResourcePlanActions.addResource();
    this._onResourcePlanChange();
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
    const numberOfWeeks = this.state.data[0].allocations.length;

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
              startDate={this.state.startDate} />
          </thead>
          <tfoot>
            <TotalsFooter numberOfWeeks={numberOfWeeks} data={this.state.data} />
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
  startDate: React.PropTypes.instanceOf(Date)
};

export default ResourcePlans;
