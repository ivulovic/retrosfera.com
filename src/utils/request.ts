/**
 * @docs FrontEnd // Utils // Request
 * @desc makeApiUrl - Create full API URL endpoint string for requests
 *
 * @param {string} endpoint - A string that needs to be concated with API address
 * @returns {string} The prepared URL for request
 */
export function makeApiUrl(endpoint) {
  return endpoint;
}

function makeGenericReq(method, body = null) {
  return {
    method,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // same-origin -> for some reason not working
    //
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
}

export function makePostReq(body) {
  return makeGenericReq('POST', body);
}

export function makePatchReq(body) {
  return makeGenericReq('PATCH', body);
}

export function makePutReq(body) {
  return makeGenericReq('PUT', body);
}

export function makeDeleteReq(body) {
  return makeGenericReq('DELETE', body);
}

export function makeGetReq() {
  return makeGenericReq('GET');
}

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
