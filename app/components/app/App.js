import React from 'react';
import TabBar from '../tab-bar/TabBar';
import TabList from '../tab-bar/TabList';
import Tab from '../tab-bar/Tab';
import TabPanel from '../tab-bar/TabPanel';
import ResourcePlans from '../resource-plans-table/ResourcePlans';

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
          <ResourcePlans startDate={new Date()} />
        </TabPanel>
        <TabPanel>
          Monthly
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
