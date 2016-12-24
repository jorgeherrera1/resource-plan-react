class ResourcePlanAPI {

  addWeek() {
    return fetch('/api/add-week', {method: 'PUT'});
  }

  addResource() {
    return fetch('/api/add-resource', {method: 'POST'});
  }

}

export default new ResourcePlanAPI();
