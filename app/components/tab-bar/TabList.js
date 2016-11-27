import React from 'react';

class TabList extends React.Component {

  render() {
    return (
      <nav className="rp-tabs">
        <ul className="c-tab-nav" role="tablist">
          {this.props.children}
        </ul>
      </nav>
    );
  }

}

TabList.displayName = 'TabList';
TabList.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default TabList;
