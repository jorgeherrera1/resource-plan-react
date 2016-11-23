import React from 'react';

class TabContent extends React.Component {

  render() {
    return (
      <div className="rp-content" role="tabpanel">
        {this.props.children}
      </div>
    );
  }

}

TabContent.propTypes = {
  children: React.PropTypes.any.isRequired
};

export default TabContent;
