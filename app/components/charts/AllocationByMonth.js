import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import ResourcePlanStore from '../../stores/ResourcePlanStore';

const MONTH_BG_COLOR = [
    'rgba(0, 0, 102, 0.2)',
    'rgba(0, 51, 51, 0.2)',
    'rgba(0, 102, 0, 0.2)',
    'rgba(0, 102, 102, 0.2)',
    'rgba(0, 102, 255, 0.2)',
    'rgba(0, 255, 0, 0.2)'
];

class AllocationByMonth extends React.Component {

  constructor(props) {
    super(props);

    let resourcePlans = ResourcePlanStore.getAll();
    this.state = {resourcePlans};
  }

  _onResourcePlanChange() {
    console.log('resource plan changed, chart updated');
  }

  componentDidMount() {
    ResourcePlanStore.addChangeListener(this._onResourcePlanChange);
    this.renderChart();
  }

  componentWillUnmount() {
    ResourcePlanStore.removeChangeListener(this._onResourcePlanChange);
    this.chartInstance.destroy();
  }

  renderChart() {
    const node = ReactDOM.findDOMNode(this);

    this.chartInstance = new Chart(node, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Number of Hours',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
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
  width: React.PropTypes.number
};

export default AllocationByMonth;
