import React from 'react';
import {summarizeByResource} from '../../utils/ResourcePlanUtils';

class Totals extends React.Component {

  renderTotalHoursByResource(totalHoursByResource) {
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

  renderGrandTotal(totalHoursByResource) {
    const grandTotal = totalHoursByResource.reduce((prevHours, currentHours) => {
      return prevHours + currentHours;
    });

    return (
      <tr>
        <td className="center-align">
          <strong>{grandTotal}</strong>
        </td>
      </tr>
    );
  }

  render() {
    const totalHoursByResource = summarizeByResource(this.props.resourcePlans);
    const totalHoursByResourceElements = this.renderTotalHoursByResource(totalHoursByResource);
    const grandTotalElement = this.renderGrandTotal(totalHoursByResource);

    return (
      <div className="rp-totals">
        <table className="rp-table">
          <thead>
            <tr>
              <th className="rp-resource-total-col center-align">Total</th>
            </tr>
          </thead>
          <tfoot>
            {grandTotalElement}
          </tfoot>
          <tbody>
            {totalHoursByResourceElements}
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
