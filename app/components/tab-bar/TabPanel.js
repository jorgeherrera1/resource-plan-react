import React from 'react';

class TabPanel extends React.Component {

  render() {
    return (
      <div id={this.props.id} className="rp-content" role="tabpanel"
        style={{display: this.props.active ? null : 'none'}}>
        {this.props.children}
      </div>
    );
  }

}

TabPanel.propTypes = {
  id: React.PropTypes.string,
  active: React.PropTypes.bool,
  children: React.PropTypes.any
};

export default TabPanel;
