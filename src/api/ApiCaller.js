import Logger from '../utils/Logger';

export default class ApiCaller {
  static BASE_API_URL = window.BASE_URL_API ? window.BASE_URL_API : '';

  static async fetch(url, method = 'GET', data = null) {
    const query = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (method === 'PATCH' || method === 'POST' || method === 'DELETE' || method === 'PUT' || data != null) {
      query.body = JSON.stringify(data);
    }
    try {
      const response = await window.fetch(`${ApiCaller.BASE_API_URL}${url}`, query);
      if (response.status === 200) {
        return await response.json();
      }
    } catch (e) {
      Logger.logError(e);
    }
    const error = { isError: true, errorCode: 'error.general' };
    throw error;
  }
}
