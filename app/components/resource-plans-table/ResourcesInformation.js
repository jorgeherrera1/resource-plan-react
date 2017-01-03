import React from 'react';
import ResourcePlanActions from '../../actions/ResourcePlanActions';
import $ from 'jquery';
import 'materialize';

class ResourcesInformation extends React.Component {

  handleNameChanged(resourcePlanId, resourceName) {
    ResourcePlanActions.updateResourceName(resourcePlanId, resourceName);
  }

  renderResourcesInformation() {
    const resourcesInformation = this.props.resourcePlans.map((resourcePlan, resourcePlanId) => {
      return (
        <tr key={resourcePlanId}>
          <td>
            <div className="valign-wrapper">
              <button className="btn-floating waves-effect waves-light indigo darken-2"
                onClick={(e) => {
                  console.log('clicked: ' + resourcePlanId);
                  $('#modal1').modal({
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    opacity: .65, // Opacity of modal background
                    in_duration: 300, // Transition in duration
                    out_duration: 200, // Transition out duration
                    starting_top: '40%', // Starting top style attribute
                    ending_top: '70%'
                  });
                  $('#modal1').modal('open');
                }}>
                <i className="material-icons">info_outline</i>
              </button>
              <div style={{marginLeft: 'auto'}}>
                {resourcePlanId + 1}
              </div>
            </div>
          </td>
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
              <th className="rp-resource-id-col right-align">#</th>
              <th className="rp-resource-name-col">Resource</th>
            </tr>
          </thead>
          <tbody>
            {resourcesInformation}
          </tbody>
        </table>
        <div id="modal1" className="modal bottom-sheet">
          <div className="modal-content">
            <h4>Resource Information</h4>
            <p>A chart is supposed to go here</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Remove</a>
          </div>
        </div>
      </div>
    );
  }
}

ResourcesInformation.propTypes = {
  resourcePlans: React.PropTypes.array
};

export default ResourcesInformation;
