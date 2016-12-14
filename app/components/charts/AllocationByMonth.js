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
    const numberOfWeeks = this.props.resourcePlans[0].allocations.length;
    const start = moment(this.props.startDate);
    const end = start.clone().add(numberOfWeeks - 1, 'weeks').endOf('month');
    const range = moment.range(start, end);

    let months = [];

    range.by('months', function(month) {
      months.push(month.format('MMMM'));
    });

    return months;
  }

  getData() {
    this.props.resourcePlans.forEach((resourcePlan) => {
      console.log(resourcePlan);
    });
  }

  renderChart() {
    let monthLabels = this.getMonthLabels();
    let monthBackgroundColors = monthLabels.map((month) => {
      return MONTH_COLORS[month].background;
    });
    let monthBorderColors = monthLabels.map((month) => {
      return MONTH_COLORS[month].border;
    });

    const node = ReactDOM.findDOMNode(this);

    this.chartInstance = new Chart(node, {
      type: 'bar',
      data: {
        labels: this.getMonthLabels(),
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
  startDate: React.PropTypes.instanceOf(Date),
  resourcePlans: React.PropTypes.array
};

export default AllocationByMonth;
