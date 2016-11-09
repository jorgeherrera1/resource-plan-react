import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';

var ResourcePlanActions = {

  updateResourceName: function(resourcePlanId, name) {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.UPDATE_RESOURCE_NAME,
      resourcePlanId: resourcePlanId,
      name: name
    });
  },

  updateWeeklyAllocation: function(resourcePlanId, weekId, hours) {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.UPDATE_WEEKLY_ALLOCATION,
      resourcePlanId: resourcePlanId,
      weekId: weekId,
      hours: hours
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
