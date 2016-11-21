import React from 'react';
import TabNavItem from './TabNavItem';

class TabNav extends React.Component {

  handleTabNavItemClicked(tabNavItem) {
    console.log(`clicked ${tabNavItem}`);
  }

  render() {
    return (
      <nav>
        <ul className="c-tab-nav" role="tablist">
          {this.props.children}
        </ul>
      </nav>
    );
  }

}

TabNav.propTypes = {

};

export default TabNav;
