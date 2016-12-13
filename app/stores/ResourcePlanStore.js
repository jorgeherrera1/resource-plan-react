import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';

class ResourcePlanStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    this.data = {
      project: 'My Project',
      startDate: new Date(),
      resourcePlans: [
        {name: 'Dev Lead', allocations: [20, 20, 20, 20]},
        {name: 'Sr Developer', allocations: [40, 40, 40, 40]},
        {name: 'Jr Developer', allocations: [40, 40, 20, 10]},
        {name: 'Jr Developer', allocations: [40, 40, 20, 10]}
      ]
    };
  }

  getData() {
    return this.data;
  }

  updateResourceName(resourcePlanId, resourceName) {
    this.data.resourcePlans[resourcePlanId].name = resourceName;
    this.__emitChange();
  }

  updateWeeklyAllocation(resourcePlanId, weekId, hours) {
    this.data.resourcePlans[resourcePlanId].allocations[weekId] = Number(hours);
    this.__emitChange();
  }

  addWeek() {
    for (let i = 0; i < this.data.resourcePlans.length; i++) {
      this.data.resourcePlans[i].allocations.push(0);
    }
    this.__emitChange();
  }

  addResource() {
    this.data.resourcePlans.push({
      name: 'Developer',
      allocations: new Array(this.data.resourcePlans[0].allocations.length).fill(0)
    });
    this.__emitChange();
  }

  __onDispatch(action) {
    const {actionType, payload} = action;

    switch (actionType) {
      case ResourcePlanConstants.UPDATE_RESOURCE_NAME:
        this.updateResourceName(payload.resourcePlanId, payload.name);
        break;

      case ResourcePlanConstants.UPDATE_WEEKLY_ALLOCATION:
        this.updateWeeklyAllocation(payload.resourcePlanId, payload.weekId, payload.hours);
        break;

      case ResourcePlanConstants.ADD_WEEK:
        this.addWeek();
        break;

      case ResourcePlanConstants.ADD_RESOURCE:
        this.addResource();
        break;

      default:

    }
  }

}

export default new ResourcePlanStore(AppDispatcher);
