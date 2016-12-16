import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {calculateWeeks} from '../utils/ResourcePlanUtils';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';

let data = {
  project: 'My Project',
  startDate: new Date(),
  resourcePlans: [
    {name: 'Dev Lead', allocations: [20, 20, 20, 20]},
    {name: 'Sr Developer', allocations: [40, 40, 40, 40]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 10]},
    {name: 'Jr Developer', allocations: [40, 40, 20, 10]}
  ]
};

function updateResourceName(resourcePlanId, resourceName) {
  data.resourcePlans[resourcePlanId].name = resourceName;
}

function updateWeeklyAllocation(resourcePlanId, weekId, hours) {
  data.resourcePlans[resourcePlanId].allocations[weekId] = Number(hours);
}

function addWeek() {
  for (let i = 0; i < data.resourcePlans.length; i++) {
    data.resourcePlans[i].allocations.push(0);
  }
}

function addResource() {
  data.resourcePlans.push({
    name: 'Developer',
    allocations: new Array(data.resourcePlans[0].allocations.length).fill(0)
  });
}

class ResourcePlanStore extends Store {

  getData() {
    return data;
  }

  getNumberOfWeeks() {
    return data.resourcePlans[0].allocations.length;
  }

  getWeeks() {
    const numberOfWeeks = this.getNumberOfWeeks();
    const weeks = calculateWeeks(data.startDate, numberOfWeeks);

    return weeks;
  }

  __onDispatch(action) {
    const {actionType, payload} = action;

    switch (actionType) {
      case ResourcePlanConstants.UPDATE_RESOURCE_NAME:
        updateResourceName(payload.resourcePlanId, payload.resourceName);
        this.__emitChange();
        break;

      case ResourcePlanConstants.UPDATE_WEEKLY_ALLOCATION:
        updateWeeklyAllocation(payload.resourcePlanId, payload.weekId, payload.hours);
        this.__emitChange();
        break;

      case ResourcePlanConstants.ADD_WEEK:
        addWeek();
        this.__emitChange();
        break;

      case ResourcePlanConstants.ADD_RESOURCE:
        addResource();
        this.__emitChange();
        break;

      default:

    }
  }

}

export default new ResourcePlanStore(AppDispatcher);
