import React from 'react';
import ResourcePlanStore from '../../stores/ResourcePlanStore';
import Nav from './Nav';
import {Match, Redirect} from 'react-router';
import ResourcePlans from '../resource-plans-table/ResourcePlans';
import AllocationByMonth from '../charts/AllocationByMonth';
import ResourcePlanTable from '../resource-plan-table-v2/ResourcePlanTable';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: ResourcePlanStore.getData(),
      metadata: {
        numberOfWeeks: ResourcePlanStore.getNumberOfWeeks(),
        weeks: ResourcePlanStore.getWeeks()
      }
    };

    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount() {
    this.storeListenerToken = ResourcePlanStore.addListener(this.onDataChange);
  }

  componentWillUnmount() {
    this.storeListenerToken.remove();
  }

  onDataChange() {
    this.setState({
      data: ResourcePlanStore.getData(),
      metadata: {
        numberOfWeeks: ResourcePlanStore.getNumberOfWeeks(),
        weeks: ResourcePlanStore.getWeeks()
      }
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="section container">
          <Match pattern="/" exactly render={() => <Redirect to="/worksheet"/>} />
          <Match pattern="/worksheet" render={() => (
            <ResourcePlans
              numberOfWeeks={this.state.metadata.numberOfWeeks}
              weeks={this.state.metadata.weeks}
              resourcePlans={this.state.data.resourcePlans}/>
            )} />
          <Match pattern="/monthly" render={() => (
            <AllocationByMonth
              startDate={this.state.data.startDate}
              resourcePlans={this.state.data.resourcePlans}/>
            )} />
          <Match pattern="/test" render={() => (
            <ResourcePlanTable
              startDate={this.state.data.startDate}
              resourcePlans={this.state.data.resourcePlans}/>
            )} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
