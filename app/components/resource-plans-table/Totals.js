import React from 'react';
import {summarizeByResource} from '../../utils/ResourcePlanUtils';

class Totals extends React.Component {

  renderTotalHoursByResource() {
    const totalHoursByResource = summarizeByResource(this.props.resourcePlans);

    return totalHoursByResource.map((hours, resourcePlanId) => {
      return (
        <tr key={resourcePlanId}>
          <td className="center-align">
            <strong>{hours}</strong>
          </td>
        </tr>
      );
    });
  }

  render() {
    const totalHoursByResource = this.renderTotalHoursByResource();

    return (
      <div className="rp-totals">
        <table className="rp-table">
          <thead>
            <tr>
              <th className="rp-resource-total-col center-align">Total</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td className="center-align"><strong>9999</strong></td>
            </tr>
          </tfoot>
          <tbody>
            {totalHoursByResource}
          </tbody>
        </table>
      </div>
    );
  }

}

Totals.propTypes = {
  resourcePlans: React.PropTypes.array
};

export default Totals;
