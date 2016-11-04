import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ResourcePlanConstants from '../constants/ResourcePlanConstants';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

var _resourcePlans = [
  {id: 1, name: 'Jorge', allocations: [20, 40, 40, 40]},
  {id: 2, name: 'Emmanuel', allocations: [10, 10, 10, 10]},
  {id: 3, name: 'Adolfo', allocations: [10, 20, 10, 20]}
];

function updateResourceName(id, name) {
  _resourcePlans[id].name = name;
}

function addWeek() {
  for (let i = 0; i < _resourcePlans.length; i++) {
    _resourcePlans[i].allocations.push(0);
  }
}

var ResourcePlanStore = Object.assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _resourcePlans;
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
      updateResourceName(action.id, action.name);
      ResourcePlanStore.emitChange();

      break;

    case ResourcePlanConstants.ADD_WEEK:
      addWeek();
      ResourcePlanStore.emitChange();

      break;

    default:

  }
});

export default ResourcePlanStore;
