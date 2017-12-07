/**
 * List issues for a repository.
 * @method
 * @name #getReposByOwnerByRepoIssues
 * @param {string} owner - Name of repository owner.
 * @param {string} repo - Name of repository.
 * @param {string} filter - Issues assigned to you / created by you / mentioning you / you're
subscribed to updates for / All issues the authenticated user can see

 * @param {string} state - 
 * @param {string} labels - String list of comma separated Label names. Example - bug,ui,@high.
 * @param {string} sort - 
 * @param {string} direction - 
 * @param {string} [since] - Optional string of a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
Only issues updated at or after this time are returned.

 * @param {string} [xGitHubMediaType] - You can check the current version of media type in responses.

 * @param {string} [accept] - Is used to set specified media type.
 * @param {integer} [xRateLimitLimit] - 
 * @param {integer} [xRateLimitRemaining] - 
 * @param {integer} [xRateLimitReset] - 
 * @param {integer} [xGitHubRequestId] - 

 *
 */
var request = require('request-promise');

function main(args) {
    return new Promise((resolve, reject) => {
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        var path = '/repos/{owner}/{repo}/issues';

        headers['Content-Type'] = ['application/json'];

        if (args['owner'] === undefined) {
            reject({
                error: 'Missing required string parameter: owner'
            });
            return;
        }

        path = path.replace('{owner}', args['owner']);

        if (args['repo'] === undefined) {
            reject({
                error: 'Missing required string parameter: repo'
            });
            return;
        }

        path = path.replace('{repo}', args['repo']);

        if (args['filter'] !== undefined) {
            queryParameters['filter'] = args['filter'];
        }

        if (args['filter'] === undefined) {
            reject({
                error: 'Missing required string parameter: filter'
            });
            return;
        }

        if (args['state'] !== undefined) {
            queryParameters['state'] = args['state'];
        }

        if (args['state'] === undefined) {
            reject({
                error: 'Missing required string parameter: state'
            });
            return;
        }

        if (args['labels'] !== undefined) {
            queryParameters['labels'] = args['labels'];
        }

        if (args['labels'] === undefined) {
            reject({
                error: 'Missing required string parameter: labels'
            });
            return;
        }

        if (args['sort'] !== undefined) {
            queryParameters['sort'] = args['sort'];
        }

        if (args['sort'] === undefined) {
            reject({
                error: 'Missing required string parameter: sort'
            });
            return;
        }

        if (args['direction'] !== undefined) {
            queryParameters['direction'] = args['direction'];
        }

        if (args['direction'] === undefined) {
            reject({
                error: 'Missing required string parameter: direction'
            });
            return;
        }

        if (args['since'] !== undefined) {
            queryParameters['since'] = args['since'];
        }

        if (args['xGitHubMediaType'] !== undefined) {
            headers['X-GitHub-Media-Type'] = args['xGitHubMediaType'];
        }

        if (args['accept'] !== undefined) {
            headers['Accept'] = args['accept'];
        }

        if (args['xRateLimitLimit'] !== undefined) {
            headers['X-RateLimit-Limit'] = args['xRateLimitLimit'];
        }

        if (args['xRateLimitRemaining'] !== undefined) {
            headers['X-RateLimit-Remaining'] = args['xRateLimitRemaining'];
        }

        if (args['xRateLimitReset'] !== undefined) {
            headers['X-RateLimit-Reset'] = args['xRateLimitReset'];
        }

        if (args['xGitHubRequestId'] !== undefined) {
            headers['X-GitHub-Request-Id'] = args['xGitHubRequestId'];
        }

        var req = {
            method: 'GET',
            uri: 'https://api.github.com' + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                reject({
                    error: error
                });
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
                }
                if (response.statusCode === 204) {
                    resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    resolve({
                        response: response,
                        body: body
                    });
                } else {
                    reject({
                        error: response.statusCode,
                        response: response,
                        body: body
                    });
                }
            }
        });
    });
};

exports.main = main;