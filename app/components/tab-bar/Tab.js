import React from 'react';

class Tab extends React.Component {

  constructor(props) {
    super(props);

    this.handleTabClicked = this.handleTabClicked.bind(this);
  }

  handleTabClicked() {
    this.props.onTabClicked(this.props.panelId);
  }

  render() {
    let styles = 'c-tab-nav__tab';
    styles += this.props.active ? ' is-active' : '';

    return (
      <li role="presentation" className={styles}>
        <button
          onClick={this.handleTabClicked}
          role="tab"
          aria-controls={this.props.panelId}
          aria-selected={this.props.active}
          aria-expanded={this.props.active}>{this.props.children}</button>
      </li>
    );
  }

}

Tab.propTypes = {
  children: React.PropTypes.string,
  active: React.PropTypes.bool,
  panelId: React.PropTypes.string,
  onTabClicked: React.PropTypes.func
};

export default Tab;
