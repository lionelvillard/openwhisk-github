/**
 * Search users.
 * @method
 * @name #getSearchUsers
 * @param {string} [order] - The sort field. if sort param is provided. Can be either asc or desc.
 * @param {string} q - The search terms. This can be any combination of the supported user
search parameters:
'Search In' Qualifies which fields are searched. With this qualifier you
can restrict the search to just the username, public email, full name,
location, or any combination of these.
'Repository count' Filters users based on the number of repositories they
have.
'Location' Filter users by the location indicated in their profile.
'Language' Search for users that have repositories that match a certain
language.
'Created' Filter users based on when they joined.
'Followers' Filter users based on the number of followers they have.

 * @param {string} [sort] - If not provided, results are sorted by best match.
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
        var path = '/search/users';

        headers['Content-Type'] = ['application/json'];

        if (args['order'] !== undefined) {
            queryParameters['order'] = args['order'];
        }

        if (args['q'] !== undefined) {
            queryParameters['q'] = args['q'];
        }

        if (args['q'] === undefined) {
            reject({
                error: 'Missing required string parameter: q'
            });
            return;
        }

        if (args['sort'] !== undefined) {
            queryParameters['sort'] = args['sort'];
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