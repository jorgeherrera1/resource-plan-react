import React from 'react';
import TabBar from '../tab-bar/TabBar';
import TabList from '../tab-bar/TabList';
import Tab from '../tab-bar/Tab';
import TabPanel from '../tab-bar/TabPanel';
import ResourcePlans from '../resource-plans-table/ResourcePlans';
import AllocationByMonth from '../charts/AllocationByMonth';

class App extends React.Component {

  render() {
    return (
      <TabBar>
        <TabList>
          <Tab>Worksheet</Tab>
          <Tab>Monthly</Tab>
          <Tab>Burndown</Tab>
        </TabList>
        <TabPanel>
          <ResourcePlans />
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
