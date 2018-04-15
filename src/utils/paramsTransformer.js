export const defaultPageSize = 10;

export default function (params = {}) {
  const newParams = Object.keys(params).reduce((prev, cur) => {
    const newObj = {
      ...prev,
    };

    switch (cur) {
      case 'pageSize':
        newObj.limit = params[cur];
        newObj.limit = newObj.limit || defaultPageSize;
        break;
      case 'page':
        newObj.offset = (params[cur] - 1) * params.pageSize;
        newObj.offset = newObj.offset || 0;
        break;
      case 'sortDesc':
        newObj.sortOrder = params[cur] ? 'desc' : 'asc';
        break;
      case 'sortField':
        newObj.sortField = params[cur];
        newObj.sortOrder = newObj.sortOrder || 'asc';
        break;
      default:
        break;
    }

    return newObj;
  }, {});

  return newParams;
}
