import React from 'react';
import {Link} from 'react-router';

class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.renderTab = this.renderTab.bind(this);
  }

  renderTab(params) {
    return (
      <li role="presentation" className="c-tab-nav__tab">
        <button
          // onClick={}
          role="tab"
          aria-controls={params.isActive}
          aria-selected={params.isActive}
          aria-expanded={params.isActive}>test</button>
      </li>
    );
  }

  render() {
    return (
      <nav className="rp-tabs">
        <ul className="c-tab-nav" role="tablist">
          <Link to="/worksheet">{(params) => this.renderTab('Worksheet')}</Link>
          <Link to="/monthly">{(params) => this.renderTab('Monthly')}</Link>
        </ul>
      </nav>
    );
  }

}

export default Nav;
