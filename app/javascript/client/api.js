/**
 * File: api.js
 * Namespace: app/javascript/client
 */

const routes = {
  subscriptions: "api/subscriptions" // GET
};

/**
 * Get subscriptions from API. 
 * @param {string} query - 'query' param for GET request.
 * @param {int} page - 'page' param for GET request.
 */
module.getSubscriptions = (query="", page=1) => {
  return new Promise((resolve, reject) => {

    const url = routes.subscriptions + "?query=" + query + "&page=" + page;
    fetch(url).then((res) => {
  	  return res.json();
    }).then((json_data) => {
  	  resolve(json_data);
    });

  });
}

export default module;
