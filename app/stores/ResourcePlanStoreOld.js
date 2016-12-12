import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

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

function updateResourceName(id, name) {
  data.resourcePlans[id].name = name;
}

function updateWeeklyAllocation(id, weekId, hours) {
  data.resourcePlans[id].allocations[weekId] = Number(hours);
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

var ResourcePlanStore = Object.assign({}, EventEmitter.prototype, {

  getAll: function() {
    return data;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register((action) => {
  switch (action.actionType) {

    case ResourcePlanConstants.UPDATE_RESOURCE_NAME:
      updateResourceName(action.resourcePlanId, action.name);
      ResourcePlanStore.emitChange();

      break;

    case ResourcePlanConstants.UPDATE_WEEKLY_ALLOCATION:
      updateWeeklyAllocation(action.resourcePlanId, action.weekId, action.hours);
      ResourcePlanStore.emitChange();

      break;

    case ResourcePlanConstants.ADD_WEEK:
      addWeek();
      ResourcePlanStore.emitChange();

      break;

    case ResourcePlanConstants.ADD_RESOURCE:
      addResource();
      ResourcePlanStore.emitChange();

      break;

    default:

  }
});

export default ResourcePlanStore;
