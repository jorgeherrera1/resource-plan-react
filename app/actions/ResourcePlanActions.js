import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';

const ResourcePlanActions = {

  updateResourceName: function(resourcePlanId, resourceName) {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.UPDATE_RESOURCE_NAME,
      payload: {resourcePlanId, resourceName}
    });
  },

  updateWeeklyAllocation: function(resourcePlanId, weekId, hours) {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.UPDATE_WEEKLY_ALLOCATION,
      payload: {resourcePlanId, weekId, hours}
    });
  },

  addWeek: function() {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.ADD_WEEK
    });
  },

  addResource: function() {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.ADD_RESOURCE
    });
  }

};

export default ResourcePlanActions;
