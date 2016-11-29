import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import moment from 'moment';

const COLORS = {
  January: {
    background: 'rgba(255, 99, 132, 0.2)',
    border: 'rgba(255,99,132,1)'
  },
  February: {
    background: 'rgba(54, 162, 235, 0.2)',
    border: 'rgba(54, 162, 235, 1)'
  },
  March: {
    background: 'rgba(255, 206, 86, 0.2)',
    border: 'rgba(255, 206, 86, 1)'
  },
  April: {
    background: 'rgba(75, 192, 192, 0.2)',
    border: 'rgba(75, 192, 192, 1)'
  },
  May: {
    background: 'rgba(153, 102, 255, 0.2)',
    border: 'rgba(153, 102, 255, 1)'
  },
  June: {
    background: 'rgba(255, 159, 64, 0.2)',
    border: 'rgba(255, 159, 64, 1)'
  },
  July: {
    background: 'rgba(255, 99, 132, 0.2)',
    border: 'rgba(255,99,132,1)'
  },
  August: {
    background: 'rgba(54, 162, 235, 0.2)',
    border: 'rgba(54, 162, 235, 1)'
  },
  September: {
    background: 'rgba(255, 206, 86, 0.2)',
    border: 'rgba(255, 206, 86, 1)'
  },
  October: {
    background: 'rgba(75, 192, 192, 0.2)',
    border: 'rgba(75, 192, 192, 1)'
  },
  November: {
    background: 'rgba(153, 102, 255, 0.2)',
    border: 'rgba(153, 102, 255, 1)'
  },
  December: {
    background: 'rgba(255, 159, 64, 0.2)',
    border: 'rgba(255, 159, 64, 1)'
  }
};

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
      
    });
  }

  renderChart() {
    let monthLabels = this.getMonthLabels();
    let monthBackgroundColors = monthLabels.map((month) => {
      return COLORS[month].background;
    });
    let monthBorderColors = monthLabels.map((month) => {
      return COLORS[month].border;
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
