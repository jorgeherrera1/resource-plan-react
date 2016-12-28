import React from 'react';
import Chart from 'chart.js';
import Immutable from 'immutable';
import {summarizeByMonth} from '../../utils/ResourcePlanUtils';

class Burndown extends React.Component {

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
        monthsLabels.push(week.weekStarting.format('MMMM'));
      }

      monthsLabels.push(week.weekEnding.format('MMMM'));
    });

    return Immutable.OrderedSet(monthsLabels).toArray();
  }

  getData() {
    const hoursByMonth = summarizeByMonth(this.props.weeks, this.props.resourcePlans);
    const totalHours = hoursByMonth.reduce((prevHours, currentHours) => {
      return prevHours + currentHours;
    });
    let remainingHours = totalHours;
    const burndownHours = hoursByMonth.map((hours) => {
      remainingHours -= hours;
      return remainingHours;
    });
    burndownHours.pop();

    return [totalHours].concat(burndownHours);
  }

  renderChart() {
    const monthLabels = this.getMonthLabels();
    const data = this.getData();

    this.chartInstance = new Chart(this.node, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Number of Hours',
          data: data,
          borderColor: '#1a237e',
          borderCapStyle: 'butt',
          borderJoinStyle: 'miter',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 2,
          lineTension: 0.1,
          fill: false
        }]
      }
    });
  }

  render() {
    return (
      <canvas ref={(node) => (this.node = node)}
        height={this.props.height} width={this.props.width}>
      </canvas>
    );
  }

}

Burndown.displayName = 'Burndown';
Burndown.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  weeks: React.PropTypes.array,
  resourcePlans: React.PropTypes.array
};

export default Burndown;
