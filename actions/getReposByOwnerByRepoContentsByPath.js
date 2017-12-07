/**
 * Get contents.
This method returns the contents of a file or directory in a repository.
Files and symlinks support a custom media type for getting the raw content.
Directories and submodules do not support custom media types.
Note: This API supports files up to 1 megabyte in size.
Here can be many outcomes. For details see "http://developer.github.com/v3/repos/contents/"

 * @method
 * @name #getReposByOwnerByRepoContentsByPath
 * @param {string} owner - Name of repository owner.
 * @param {string} repo - Name of repository.
 * @param {string} path - 
 * @param {string} [path] - The content path.
 * @param {string} [ref] - The String name of the Commit/Branch/Tag. Defaults to 'master'.
 * @param {string} [xGitHubMediaType] - You can check the current version of media type in responses.

 * @param {string} [accept] - Is used to set specified media type.
 * @param {integer} [xRateLimitLimit] - 
 * @param {integer} [xRateLimitRemaining] - 
 * @param {integer} [xRateLimitReset] - 
 * @param {integer} [xGitHubRequestId] - 
 * @param {string} [userAgent] - 

 *
 */
var request = require('request-promise');

function main(args) {
    return new Promise((resolve, reject) => {
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        var path = '/repos/{owner}/{repo}/contents/{path}';

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

        if (args['path'] === undefined) {
            reject({
                error: 'Missing required string parameter: path'
            });
            return;
        }

        path = path.replace('{path}', args['path']);

        if (args['path'] !== undefined) {
            queryParameters['path'] = args['path'];
        }

        if (args['ref'] !== undefined) {
            queryParameters['ref'] = args['ref'];
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

        if (args['userAgent'] !== undefined) {
            headers['User-Agent'] = args['userAgent'];
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