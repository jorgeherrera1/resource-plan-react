import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';

var ResourcePlanActions = {

  updateResourceName: function(id, name) {
    AppDispatcher.dispatch({
      actionType: ResourcePlanConstants.UPDATE_RESOURCE_NAME,
      id: id,
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
  }

};

export default ResourcePlanActions;
