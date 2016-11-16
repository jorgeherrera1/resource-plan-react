import React from 'react';
import TabNavItem from './TabNavItem';

class TabNav extends React.Component {

  render() {
    return (
      <nav>
        <ul className="c-tab-nav" role="tablist">
          <TabNavItem title="Resource Plan" isActive={true} />
          <TabNavItem title="Monthly" />
          <TabNavItem title="Burndown" />
        </ul>
      </nav>
    );
  }

}

TabNav.propTypes = {

};

export default TabNav;
