import React from 'react';

class TabBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'rp-tab-panel-0'
    };

    this.handleTabClicked = this.handleTabClicked.bind(this);
  }

  handleTabClicked(tab) {
    this.setState({
      activeTab: tab
    });
  }

  renderTabList(tabList, panelIds) {
    let tabIndex = 0;

    return React.cloneElement(tabList, {
      ref: 'tablist',
      children: React.Children.map(tabList.props.children, (tab) => {
        return React.cloneElement(tab, {
          panelId: panelIds[tabIndex],
          active: this.state.activeTab === panelIds[tabIndex++],
          onTabClicked: this.handleTabClicked
        });
      })
    });
  }

  renderChildren() {
    const childrenCount = React.Children.count(this.props.children);
    const tabCount = childrenCount - 1;
    let childrenIndex = 0;
    let tabIndex = 0;
    let panelIds = [];

    for (let i = 0; i < tabCount; i++) {
      panelIds.push('rp-tab-panel-' + i);
    }

    return React.Children.map(this.props.children, (child) => {
      if (childrenIndex === 0) {
        childrenIndex++;
        return this.renderTabList(child, panelIds);
      }

      return React.cloneElement(child, {
        id: panelIds[tabIndex],
        active: this.state.activeTab === panelIds[tabIndex++]
      });
    });
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    );
  }

}

TabBar.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default TabBar;
