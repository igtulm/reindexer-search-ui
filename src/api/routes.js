// dynamic route example /some/:0/path/:1/or/:2/anything/:3

const routes = {
  databases: '/db',
  database: '/db/:0',
  namespaces: '/db/:0/namespaces',
  namespace: '/db/:0/namespaces/:1',
  items: '/db/:0/namespaces/:1/items',
  indexes: '/db/:0/namespaces/:1/indexes',
  index: '/db/:0/namespaces/:1/indexes/:2',
  query: '/db/:0/query',
};

export function routeConstructor(route = '', ...args) {
  let newRoute = route;
  let i = 0;
  for (;;) {
    if (!newRoute.includes(`:${i}`)) {
      break;
    }

    newRoute = newRoute.replace(`:${i}`, args[i] || null);

    i += 1;
  }

  return newRoute;
}

export default {
  ...routes,
};
