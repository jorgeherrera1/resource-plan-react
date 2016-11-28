import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import moment from 'moment';

const BACKGROUND_COLORS = [
  'rgba(255, 99, 132, 0.2)',
  //'rgba(54, 162, 235, 0.2)',
  //'rgba(255, 206, 86, 0.2)',
  //'rgba(75, 192, 192, 0.2)',
  //'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

const BORDER_COLORS = [
  'rgba(255,99,132,1)',
  // 'rgba(54, 162, 235, 1)',
  // 'rgba(255, 206, 86, 1)',
  // 'rgba(75, 192, 192, 1)',
  // 'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

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

  renderChart() {
    this.getMonthLabels();
    const node = ReactDOM.findDOMNode(this);

    this.chartInstance = new Chart(node, {
      type: 'bar',
      data: {
        labels: this.getMonthLabels(),
        datasets: [{
          label: 'Number of Hours',
          data: [12, 19],
          backgroundColor: BACKGROUND_COLORS,
          borderColor: BORDER_COLORS,
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
