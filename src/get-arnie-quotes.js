const { httpGet } = require('./mock-http-interface');

/**
 * Formats an Arnie quote response
 * @param {object} response A http response
 * @returns {object} An object which contains the response's message
 */
const formatArnieQuoteResponse = (response) => {
  const successResultKey = 'Arnie Quote';
  const failureResultKey = 'FAILURE';
  const { status, body } = response || {};
  const { message } = JSON.parse(body) || {};
  if (status !== 200) return { [failureResultKey]: message }
  return { [successResultKey]: message };
}

/**
 * Executes a HTTP GET request on each of the URLs, transforms each of the HTTP responses.
 * @param {string[]} urls The urls to be requested
 * @returns {Promise} A promise which resolves to a results array
 */
const getArnieQuotes = async (urls) => {
  return Promise.allSettled(
    urls.map((url) => httpGet(url))
  ).then(
    (results) => results.map(
      ({ value } = {}) => formatArnieQuoteResponse(value)
    )
  );
};

module.exports = {
  getArnieQuotes,
};
