import _ from 'lodash';
import axios from 'axios';
import queryString from 'query-string';
import urljoin from 'url-join';
import humps from 'humps';

export default class BaseApiClient {
  constructor(baseurl, headers = {}) {
    this.baseurl = baseurl;
    this.metadata = {
      headers,
    };
  }

  get(url = '', params = {}) {
    if (_.isEmpty(params)) {
      return axios.get(urljoin(this.baseurl, url), this.metadata);
    }

    const preparedParams = humps.decamelizeKeys(params);
    const queryParamsString = `?${queryString.stringify(preparedParams)}`;

    return axios.get(urljoin(this.baseurl, url, queryParamsString));
  }

  create(url = '', body = {}) {
    return axios.post(urljoin(this.baseurl, url), body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update(url = '', body = {}) {
    return axios.put(urljoin(this.baseurl, url), body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(url = '', body = {}) {
    return axios.delete(urljoin(this.baseurl, url), { data: body });
  }
}
