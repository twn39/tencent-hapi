const qs = require('querystring');

module.exports = (app) => (event, context) => {
    event.body = event.body || '';

    const method = event.httpMethod;
    let url = event.path;
    if (!(event.queryString === {})) {
        url = `${url}?${qs.stringify(event.queryString)}`;
    }
    const headers = Object.assign({}, event.headers);
    const payload = Buffer.from(
        event.body,
        event.isBase64Encoded ? 'base64' : 'utf8',
    );

    delete event.body;
    headers['x-apigateway-event'] = encodeURIComponent(JSON.stringify(event));
    if (context)
        headers['x-apigateway-context'] = encodeURIComponent(
            JSON.stringify(context),
        );

    if (event.requestContext && event.requestContext.requestId) {
        headers['x-request-id'] =
            headers['x-request-id'] || event.requestContext.requestId;
    }

    return app
        .inject({ method, url, payload, headers })
        .then(res => {
            Object.keys(res.headers).forEach(h => {
                if (Array.isArray(res.headers[h])) {
                    if (h.toLowerCase() !== 'set-cookie') {
                        res.headers[h] = res.headers[h].join(',');
                    }
                }
            });

            return {
                statusCode: res.statusCode,
                body: res.payload,
                headers: res.headers,
                isBase64Encoded: false,
            };
        })
        .catch(err => {
            console.error(err);
            return {
                statusCode: 500,
                body: '',
                headers: {},
            };
        });
};
