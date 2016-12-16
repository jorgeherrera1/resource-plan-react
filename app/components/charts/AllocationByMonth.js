import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import moment from 'moment';
import {MONTH_COLORS} from '../../constants/ChartColorConstants';

class AllocationByMonth extends React.Component {

  componentDidMount() {
    this.renderChart();
  }

  componentWillUnmount() {
    this.chartInstance.destroy();
  }

  getMonthLabels() {
    const start = moment(this.props.weeks[0].weekStarting, 'DD-MMM-YYYY');
    const end = moment(this.props.weeks[this.props.weeks.length - 1].weekEnding, 'DD-MMM-YYYY');

    console.log(start);
    console.log(end);

    let months = [];
    moment.range(start, end).by('months', function(month) {
      months.push(month.format('MMMM'));
    });
    console.log(months);

    return months;
  }

  renderChart() {
    const monthLabels = this.getMonthLabels();
    const monthBackgroundColors = monthLabels.map((month) => {
      return MONTH_COLORS[month].background;
    });
    const monthBorderColors = monthLabels.map((month) => {
      return MONTH_COLORS[month].border;
    });

    const node = ReactDOM.findDOMNode(this);

    this.chartInstance = new Chart(node, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Number of Hours',
          data: [12, 19, 25],
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
