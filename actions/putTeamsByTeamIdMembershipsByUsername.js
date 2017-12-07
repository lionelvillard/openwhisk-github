/**
 * Add team membership.
In order to add a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with.

If the user is already a part of the team's organization (meaning they're on at least one other team in the organization), this endpoint will add the user to the team.

If the user is completely unaffiliated with the team's organization (meaning they're on none of the organization's teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the 'pending' state until the user accepts the invitation, at which point the membership will transition to the 'active' state and the user will be added as a member of the team.

 * @method
 * @name #putTeamsByTeamIdMembershipsByUsername
 * @param {integer} teamId - Id of team.
 * @param {string} username - Name of a member.
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
        var path = '/teams/{teamId}/memberships/{username}';

        headers['Content-Type'] = ['application/json'];

        if (args['teamId'] === undefined) {
            reject({
                error: 'Missing required integer parameter: teamId'
            });
            return;
        }

        path = path.replace('{teamId}', args['teamId']);

        if (args['username'] === undefined) {
            reject({
                error: 'Missing required string parameter: username'
            });
            return;
        }

        path = path.replace('{username}', args['username']);

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
            method: 'PUT',
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