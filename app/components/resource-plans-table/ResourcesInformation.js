import React from 'react';
import ResourcePlanActions from '../../actions/ResourcePlanActions';

class ResourcesInformation extends React.Component {

  handleNameChanged(resourcePlanId, resourceName) {
    ResourcePlanActions.updateResourceName(resourcePlanId, resourceName);
  }

  renderResourcesInformation() {
    const resourcesInformation = this.props.resourcePlans.map((resourcePlan, resourcePlanId) => {
      return (
        <tr key={resourcePlanId}>
          <td>{resourcePlanId + 1}</td>
          <td>
            <input type="text"
              value={resourcePlan.name}
              onChange={(e) => {
                this.handleNameChanged(resourcePlanId, e.target.value);
              }} />
          </td>
        </tr>
      );
    });

    return resourcesInformation;
  }

  render() {
    const resourcesInformation = this.renderResourcesInformation();

    return (
      <div className="rp-resources-information">
        <table className="rp-table">
          <thead>
            <tr>
              <th className="rp-resource-id-col">#</th>
              <th className="rp-resource-name-col">Resource</th>
            </tr>
          </thead>
          <tbody>
            {resourcesInformation}
          </tbody>
        </table>
      </div>
    );
  }
}

ResourcesInformation.propTypes = {
  resourcePlans: React.PropTypes.array
};

export default ResourcesInformation;
