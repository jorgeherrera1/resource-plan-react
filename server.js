'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');

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

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  host: 'localhost',
  port: 3000,
});

server.register(Inert, () => {});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/api/resource-plans',
  handler: function (request, reply) {
    reply(data);
  }
});

server.route({
  method: 'POST',
  path: '/api/add-week',
  handler: function (request, reply) {
    for (let i = 0; i < data.resourcePlans.length; i++) {
      data.resourcePlans[i].allocations.push(0);
    }
  }
});

server.route({
  method: 'POST',
  path: '/api/add-resource',
  handler: function (request, reply) {
    data.resourcePlans.push({
      name: 'Developer',
      allocations: new Array(data.resourcePlans[0].allocations.length).fill(0)
    });
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});