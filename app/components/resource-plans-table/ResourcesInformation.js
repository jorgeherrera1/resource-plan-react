import React from 'react';
import ResourceInfoPanel from './ResourceInfoPanel';

class ResourcesInformation extends React.Component {

  renderResourcesInformation() {
    const resourcesInformation = this.props.resourcePlans.map((resourcePlan, resourcePlanId) => {
      return (
        <ResourceInfoPanel key={resourcePlanId}
          resourcePlanId={resourcePlanId}
          resourceName={resourcePlan.name} />
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
              <th className="rp-resource-id-col right-align">#</th>
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
