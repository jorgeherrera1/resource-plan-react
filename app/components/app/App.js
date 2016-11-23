import React from 'react';
import TabBar from '../tab-bar/TabBar';
import TabList from '../tab-bar/TabList';
import Tab from '../tab-bar/Tab';
import TabContent from '../tab-bar/TabContent';
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
        <TabContent>
          <ResourcePlans startDate={new Date()} />
        </TabContent>
        <TabContent>
          hola
        </TabContent>
      </TabBar>
    );
  }

}

App.propTypes = {

};

export default App;
