import React from 'react';
import ResourcePlanStore from '../../stores/ResourcePlanStore';
import TabBar from '../tab-bar/TabBar';
import TabList from '../tab-bar/TabList';
import Tab from '../tab-bar/Tab';
import TabPanel from '../tab-bar/TabPanel';
import ResourcePlans from '../resource-plans-table/ResourcePlans';
import AllocationByMonth from '../charts/AllocationByMonth';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = ResourcePlanStore.getAll();

    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount() {
    ResourcePlanStore.addChangeListener(this.onDataChange);
  }

  componentWillUnmount() {
    ResourcePlanStore.removeChangeListener(this.onDataChange);
  }

  onDataChange() {
    this.setState(ResourcePlanStore.getAll());
  }

  render() {
    return (
      <TabBar>
        <TabList>
          <Tab>Worksheet</Tab>
          <Tab>Monthly</Tab>
          <Tab>Burndown</Tab>
        </TabList>
        <TabPanel>
          <ResourcePlans
            startDate={this.state.startDate}
            resourcePlans={this.state.resourcePlans} />
        </TabPanel>
        <TabPanel>
          <AllocationByMonth height={400} width={600} />
        </TabPanel>
        <TabPanel>
          Burndown
        </TabPanel>
      </TabBar>
    );
  }

}

App.propTypes = {

};

export default App;
