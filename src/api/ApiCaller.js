import Logger from '../utils/Logger';

export default class ApiCaller {
  static async fetch(url, method = 'GET', data = null) {
    const query = {
      method,
    };

    if (method === 'PATCH' || method === 'POST' || method === 'DELETE' || method === 'PUT' || data != null) {
      query.body = JSON.stringify(data);
    }
    try {
      const response = await window.fetch(url, query);
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
