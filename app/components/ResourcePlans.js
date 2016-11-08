import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ResourcePlan from './ResourcePlan';
import ResourcePlanStore from '../stores/ResourcePlanStore';
import ResourcePlanActions from '../actions/ResourcePlanActions';

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
      <div>
        <button onClick={this.handleAddWeek} className="c-btn c-btn--primary">Add Week</button>
        <table className="c-table">
          <thead>
            <Header
              numberOfWeeks={numberOfWeeks}
              startDate={this.state.startDate} />
          </thead>
          <tfoot>
            <Footer numberOfWeeks={numberOfWeeks} data={this.state.data} />
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
