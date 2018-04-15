import humps from 'humps';

export default function createAsyncConstant(name) {
  const bigName = humps.decamelize(name).toUpperCase();

  const asyncConstant = {
    REQUEST: `${bigName}_REQUEST`,
    SUCCESS: `${bigName}_SUCCESS`,
    FAIL: `${bigName}_FAIL`,
  };

  return asyncConstant;
}
