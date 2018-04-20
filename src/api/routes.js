// dynamic route example /some/:0/path/:1/or/:2/anything/:3

const routes = {
  search: '/search',
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
