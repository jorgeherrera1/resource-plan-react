import React from 'react';
import ResourcesInformation from './ResourcesInformation';
import WeeklyAllocations from './WeeklyAllocations';
import Totals from './Totals';
import ResourcePlanActions from '../../actions/ResourcePlanActions';

class ResourcePlans extends React.Component {

  handleAddWeek(e) {
    ResourcePlanActions.addWeek();
  }

  handleAddResource(e) {
    ResourcePlanActions.addResource();
  }

  render() {
    return (
      <div className="rp-container">
        <div className="rp-toolbar">
          <button className="waves-effect waves-light btn"
            onClick={this.handleAddWeek}>
            <i className="material-icons left">view_week</i>
            Add Week
          </button>
          <button
            className="waves-effect waves-light btn"
            onClick={this.handleAddResource}>
            <i className="material-icons left">playlist_add</i>
            Add Resource
          </button>
        </div>
        <div className="rp-table-container">
          <ResourcesInformation resourcePlans={this.props.resourcePlans} />
          <WeeklyAllocations weeks={this.props.weeks} resourcePlans={this.props.resourcePlans} />
          <Totals resourcePlans={this.props.resourcePlans} />
        </div>
      </div>
    );
  }
}

ResourcePlans.propTypes = {
  weeks: React.PropTypes.array,
  resourcePlans: React.PropTypes.array
};

export default ResourcePlans;
