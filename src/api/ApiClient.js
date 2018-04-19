import _ from 'lodash';
import axios, { CancelToken, isCancel } from 'axios';
import queryString from 'query-string';
import urljoin from 'url-join';
import humps from 'humps';

export default class BaseApiClient {
  constructor(baseurl, headers = {}) {
    this.isCancel = isCancel;
    this.baseurl = baseurl;

    this.metadata = {
      headers,
    };

    this._sources = {};
  }

  get(url = '', params = {}, isCancellable = false) {
    const source = this._sources[url];

    if (isCancellable) {
      if (source) {
        source.cancel();
      }

      const newSource = CancelToken.source();
      this._sources[url] = newSource;

      this.metadata = {
        ...this.metadata,
        cancelToken: newSource.token,
      };
    }

    if (_.isEmpty(params)) {
      return axios.get(urljoin(this.baseurl, url), this.metadata);
    }

    const preparedParams = humps.decamelizeKeys(params);
    const queryParamsString = `?${queryString.stringify(preparedParams)}`;

    return axios.get(
      urljoin(this.baseurl, url, queryParamsString),
      this.metadata,
    );
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
