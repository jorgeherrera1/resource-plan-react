import React from 'react';
import ResourcePlanActions from '../../actions/ResourcePlanActions';
import $ from 'jquery';
import 'materialize';

class ResourceInfoPanel extends React.Component {

  constructor(props) {
    super(props);

    this.showPanel = this.showPanel.bind(this);
  }

  handleNameChanged(resourcePlanId, resourceName) {
    ResourcePlanActions.updateResourceName(resourcePlanId, resourceName);
  }

  handleResourceRemoved(resourcePlanId) {
    ResourcePlanActions.removeResource(resourcePlanId);
    $(this.node).modal('close');
  }

  componentDidMount() {
    $(this.node).modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .65, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200 // Transition out duration
    });
  }

  showPanel() {
    $(this.node).modal('open');
  }

  render() {
    const {resourcePlanId, resourceName} = this.props;

    return (
      <tr>
        <td>
          <div ref={(node) => (this.node = node)} className="modal modal-fixed-footer">
            <div className="modal-content">
              <h4>Resource Information</h4>
              <p>{this.props.resourceName}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-action waves-effect waves-green btn-flat"
                onClick={(e) => {
                  this.handleResourceRemoved(resourcePlanId);
                }}>
                Remove
              </button>
            </div>
          </div>
          <div className="valign-wrapper">
            <button
              className="btn-floating waves-effect waves-light indigo darken-2"
              onClick={this.showPanel}>
              <i className="material-icons">info_outline</i>
            </button>
            <div style={{marginLeft: 'auto'}}>
              {resourcePlanId + 1}
            </div>
          </div>
        </td>
        <td>
          <input type="text"
            value={resourceName}
            onChange={(e) => {
              this.handleNameChanged(resourcePlanId, e.target.value);
            }} />
        </td>
      </tr>
    );
  }

}

ResourceInfoPanel.propTypes = {
  resourcePlanId: React.PropTypes.number,
  resourceName: React.PropTypes.string
};

export default ResourceInfoPanel;
