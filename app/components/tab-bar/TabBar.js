import React from 'react';

class TabBar extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

TabBar.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default TabBar;
