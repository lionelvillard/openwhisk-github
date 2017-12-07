/**
 * Find issues by state and keyword.
 * @method
 * @name #getLegacyIssuesSearchByOwnerByRepositoryByStateByKeyword
 * @param {string} keyword - The search term.
 * @param {string} state - Indicates the state of the issues to return. Can be either open or closed.
 * @param {string} owner - 
 * @param {string} repository - 
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
        var path = '/legacy/issues/search/{owner}/{repository}/{state}/{keyword}';

        headers['Content-Type'] = ['application/json'];

        if (args['keyword'] === undefined) {
            reject({
                error: 'Missing required string parameter: keyword'
            });
            return;
        }

        path = path.replace('{keyword}', args['keyword']);

        if (args['state'] === undefined) {
            reject({
                error: 'Missing required string parameter: state'
            });
            return;
        }

        path = path.replace('{state}', args['state']);

        if (args['owner'] === undefined) {
            reject({
                error: 'Missing required string parameter: owner'
            });
            return;
        }

        path = path.replace('{owner}', args['owner']);

        if (args['repository'] === undefined) {
            reject({
                error: 'Missing required string parameter: repository'
            });
            return;
        }

        path = path.replace('{repository}', args['repository']);

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