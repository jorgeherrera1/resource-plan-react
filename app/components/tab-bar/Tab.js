import React from 'react';

class Tab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isActive: props.isActive || false
    };

    this.handleTabNavItemClicked = this.handleTabNavItemClicked.bind(this);
  }

  handleTabNavItemClicked() {
    this.setState({
      isActive: true
    });
  }

  render() {
    let styles = 'c-tab-nav__tab';
    styles += this.state.isActive ? ' is-active' : '';

    return (
      <li role="presentation" className={styles}>
        <button
          onClick={this.handleTabNavItemClicked}
          role="tab"
          aria-selected={this.state.isActive}
          aria-expanded={this.state.isActive}>{this.props.children}</button>
      </li>
    );
  }

}

Tab.propTypes = {
  children: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool
};

export default Tab;
