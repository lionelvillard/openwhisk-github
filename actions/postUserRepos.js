/**
 * Create a new repository for the authenticated user. OAuth users must supply
repo scope.

 * @method
 * @name #postUserRepos
 * @param {string} [xGitHubMediaType] - You can check the current version of media type in responses.

 * @param {string} [accept] - Is used to set specified media type.
 * @param {integer} [xRateLimitLimit] - 
 * @param {integer} [xRateLimitRemaining] - 
 * @param {integer} [xRateLimitReset] - 
 * @param {integer} [xGitHubRequestId] - 
 * @param {object} body - 
 * @param {boolean} [body.auto_init] - True to create an initial commit with empty README. Default is false.
 * @param {string} [body.description] - 
 * @param {string} [body.gitignore_template] - Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell" Ignored if auto_init parameter is not provided. 
 * @param {boolean} [body.has_downloads] - True to enable downloads for this repository, false to disable them. Default is true.
 * @param {boolean} [body.has_issues] - True to enable issues for this repository, false to disable them. Default is true.
 * @param {boolean} [body.has_wiki] - True to enable the wiki for this repository, false to disable it. Default is true.
 * @param {string} [body.homepage] - 
 * @param {string} body.name - 
 * @param {boolean} [body.private] - True to create a private repository, false to create a public one. Creating private repositories requires a paid GitHub account.
 * @param {integer} [body.team_id] - The id of the team that will be granted access to this repository. This is only valid when creating a repo in an organization.

 *
 */
var request = require('request-promise');

function main(args) {
    return new Promise((resolve, reject) => {
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        var path = '/user/repos';

        headers['Content-Type'] = ['application/json'];

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