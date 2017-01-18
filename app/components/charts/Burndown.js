import React from 'react';
import Chart from 'chart.js';
import Immutable from 'immutable';
import {summarizeByWeek} from '../../utils/ResourcePlanUtils';

class Burndown extends React.Component {

  componentDidMount() {
    this.renderChart();
  }

  componentWillUnmount() {
    this.chartInstance.destroy();
  }

  getLabels() {
    const weekLabels = this.props.weeks.map((week, weekId) => {
      return `Week ${weekId + 1}`;
    });

    return Immutable.OrderedSet(weekLabels).toArray();
  }

  getData() {
    const hoursByWeek = summarizeByWeek(this.props.weeks, this.props.resourcePlans);
    const totalHours = hoursByWeek.reduce((prevHours, currentHours) => {
      return prevHours + currentHours;
    });
    let remainingHours = totalHours;
    const burndownHours = hoursByWeek.map((hours) => {
      remainingHours -= hours;
      return remainingHours;
    });
    burndownHours.pop();

    return [totalHours].concat(burndownHours);
  }

  renderChart() {
    const labels = this.getLabels();
    const data = this.getData();

    this.chartInstance = new Chart(this.node, {
      type: 'line',
      data: {
        labels: labels,
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
