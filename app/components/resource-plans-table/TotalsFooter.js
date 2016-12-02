import React from 'react';

class TotalsFooter extends React.Component {

  render() {
    let weekTotals = this._renderWeekTotals();

    return (
      <tr>
        <td colSpan="2"></td>
        {weekTotals}
      </tr>
    );
  }

  _renderWeekTotals() {
    let weekTotals = [];
    let grandTotal = 0;

    for (let i = 0; i < this.props.data.length; i++) {
      for (let j = 0; j < this.props.numberOfWeeks; j++) {
        weekTotals[j] = weekTotals[j] || 0;
        weekTotals[j] += this.props.data[i].allocations[j] || 0;
        grandTotal += this.props.data[i].allocations[j];
      }
    }
    weekTotals.push(grandTotal);

    return weekTotals.map((total, idx) => {
      return <td key={idx}>{total}</td>;
    });
  }
}

TotalsFooter.propTypes = {
  numberOfWeeks: React.PropTypes.number,
  data: React.PropTypes.array
};

export default TotalsFooter;
