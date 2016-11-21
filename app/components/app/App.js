import React from 'react';
import TabNav from '../tab-bar/TabNav';
import TabNavItem from '../tab-bar/TabNavItem';
import ResourcePlans from '../resource-plans-table/ResourcePlans';

class App extends React.Component {

  render() {
    return (
      <div>
        <TabNav>
          <TabNavItem title="Resource Plan" isActive={true} />
          <TabNavItem title="Monthly" />
          <TabNavItem title="Burndown" />
        </TabNav>
        <br/>
        <ResourcePlans startDate={new Date()} />
      </div>
    );
  }

}

App.propTypes = {

};

export default App;
