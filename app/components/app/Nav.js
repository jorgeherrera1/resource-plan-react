import React from 'react';
import {Link} from 'react-router';

class Nav extends React.Component {

  render() {
    const NavItem = ({onClick, href, isActive, label}) => (
      <li className={isActive ? 'active' : ''}>
        <a href={href}>{label}</a>
      </li>
    );

    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo right">
            <img className="rp-logo responsive-img" src="images/4th-Source-logo-360x76.png" />
          </a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <Link to="/worksheet">{(params) => <NavItem label="Worksheet" {...params}/>}</Link>
            <Link to="/monthly">{(params) => <NavItem label="Monthly" {...params}/>}</Link>
          </ul>
        </div>
      </nav>
    );
  }

}

export default Nav;
