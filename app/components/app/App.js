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

    this.state = ResourcePlanStore.getData();

    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount() {
    this.storeListenerToken = ResourcePlanStore.addListener(this.onDataChange);
  }

  componentWillUnmount() {
    this.storeListenerToken.remove();
  }

  onDataChange() {
    this.setState(ResourcePlanStore.getData());
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="section container">
          <Match pattern="/" exactly render={() => <Redirect to="/worksheet"/>} />
          <Match pattern="/worksheet" render={() => (
            <ResourcePlans
              startDate={this.state.startDate}
              resourcePlans={this.state.resourcePlans}/>
            )} />
          <Match pattern="/monthly" render={() => (
            <AllocationByMonth
              startDate={this.state.startDate}
              resourcePlans={this.state.resourcePlans}/>
            )} />
          <Match pattern="/test" render={() => (
            <ResourcePlanTable
              startDate={this.state.startDate}
              resourcePlans={this.state.resourcePlans}/>
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
