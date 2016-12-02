import React from 'react';
import {Link} from 'react-router';

class Nav extends React.Component {

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo right">
            <img className="rp-logo" src="images/4th-Source-logo-360x76.png" />
          </a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <Link to="worksheet">Worksheet</Link>
            </li>
            <li>
              <Link to="monthly">Monthly</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

}

export default Nav;
