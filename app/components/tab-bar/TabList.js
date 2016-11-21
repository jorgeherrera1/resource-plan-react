import React from 'react';

class TabList extends React.Component {

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

TabList.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default TabList;
