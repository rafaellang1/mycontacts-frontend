import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay(500);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      body = await response.json(); // fazendo o parse do body
    }

    if (response.ok) {
      return body;
    }

    // Optional chaining
    // verifica se o valor antes da ? é um valor null / undefined
    throw new APIError(response, body);
  }

  async post(path, body) {
    await delay(500);

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    let ResponseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      ResponseBody = await response.json(); // fazendo o parse do body
    }

    if (response.ok) {
      return ResponseBody;
    }

    // Optional chaining
    // verifica se o valor antes da ? é um valor null / undefined
    throw new APIError(response, body);
  }
}

export default HttpClient;
