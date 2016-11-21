import React from 'react';

class TabNavItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      isActive: props.isActive || false
    };

    this.handleTabNavItemClicked = this.handleTabNavItemClicked.bind(this);
  }

  handleTabNavItemClicked() {
    this.setState({
      isActive: true
    });

    this.props.onTabNavItemClicked(this.state.title);
  }

  getStyles() {
    let styles = 'c-tab-nav__tab';

    if (this.state.isActive) {
      styles += ' is-active';
    }

    return styles;
  }

  render() {
    return (
      <li role="presentation" className={this.getStyles()}>
        <button
          onClick={this.handleTabNavItemClicked}
          role="tab"
          aria-selected={this.state.isActive}>{this.state.title}</button>
      </li>
    );
  }

}

TabNavItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool
};

export default TabNavItem;
