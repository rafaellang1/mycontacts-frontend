import delay from '../../utils/delay';

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
    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }
}

export default HttpClient;
