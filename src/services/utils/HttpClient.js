import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path) {
    return this.makeRequest(path, { method: 'GET' });
  }

  post(path, body) {
    return this.makeRequest(path, {
      method: 'POST',
      body,
    });
  }

  async makeRequest(path, options) {
    await delay(500);

    const headers = new Headers();
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      responseBody = await response.json(); // fazendo o parse do body
    }

    if (response.ok) {
      return responseBody;
    }

    // Optional chaining
    // verifica se o valor antes da ? é um valor null / undefined
    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
