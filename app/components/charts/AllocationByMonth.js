import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import moment from 'moment';
import Immutable from 'immutable';
import {MONTH_COLORS} from '../../constants/ChartColorConstants';
import {summarizeByMonth} from '../../utils/ResourcePlanUtils';

class AllocationByMonth extends React.Component {

  componentDidMount() {
    this.renderChart();
  }

  componentWillUnmount() {
    this.chartInstance.destroy();
  }

  getMonthLabels() {
    let monthsLabels = [];
    this.props.weeks.forEach((week, idx) => {
      if (idx === 0) {
        monthsLabels.push(moment(week.weekStarting, 'DD-MMM-YYYY').format('MMMM'));
      }

      monthsLabels.push(moment(week.weekEnding, 'DD-MMM-YYYY').format('MMMM'));
    });

    return Immutable.OrderedSet(monthsLabels).toArray();
  }

  getData() {
    const data = summarizeByMonth(this.props.weeks, this.props.resourcePlans);

    return data;
  }

  renderChart() {
    const monthLabels = this.getMonthLabels();
    const monthBackgroundColors = monthLabels.map((month) => {
      return MONTH_COLORS[month].background;
    });
    const monthBorderColors = monthLabels.map((month) => {
      return MONTH_COLORS[month].border;
    });
    const data = this.getData();

    const node = ReactDOM.findDOMNode(this);

    this.chartInstance = new Chart(node, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Number of Hours',
          data: data,
          backgroundColor: monthBackgroundColors,
          borderColor: monthBorderColors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <canvas height={this.props.height} width={this.props.width}></canvas>
    );
  }

}

AllocationByMonth.displayName = 'AllocationByMonth';
AllocationByMonth.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  weeks: React.PropTypes.array,
  resourcePlans: React.PropTypes.array
};

export default AllocationByMonth;
