import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';

var ResourcePlanActions = {

  updateResourceName: function(id, name) {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.UPDATE_RESOURCE_NAME,
      id: id,
      name: name
    });
  }

};

export default ResourcePlanActions;
