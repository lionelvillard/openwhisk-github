/**
 * Create a comment.
  #TODO Alternative input ( http://developer.github.com/v3/pulls/comments/ )
  description: |
    Alternative Input.
    Instead of passing commit_id, path, and position you can reply to an
    existing Pull Request Comment like this:

        body
           Required string
        in_reply_to
           Required number - Comment id to reply to.

 * @method
 * @name #postReposByOwnerByRepoPullsByNumberComments
 * @param {string} owner - Name of repository owner.
 * @param {string} repo - Name of repository.
 * @param {integer} number - Id of pull.
 * @param {string} [xGitHubMediaType] - You can check the current version of media type in responses.

 * @param {string} [accept] - Is used to set specified media type.
 * @param {integer} [xRateLimitLimit] - 
 * @param {integer} [xRateLimitRemaining] - 
 * @param {integer} [xRateLimitReset] - 
 * @param {integer} [xGitHubRequestId] - 
 * @param {object} body - 
 * @param {string} [body.body] - 
 * @param {string} [body.commit_id] - 
 * @param {string} [body.path] - 
 * @param {number} [body.position] - 

 *
 */
var request = require('request-promise');

function main(args) {
    return new Promise((resolve, reject) => {
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        var path = '/repos/{owner}/{repo}/pulls/{number}/comments';

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

        if (args['number'] === undefined) {
            reject({
                error: 'Missing required integer parameter: number'
            });
            return;
        }

        path = path.replace('{number}', args['number']);

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

        if (args['body'] !== undefined) {
            body = args['body'];
        }

        var req = {
            method: 'POST',
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