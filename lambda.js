const tencentCloudHapi = require('./tencent-cloud-hapi');
const app = require('./app');

const proxy = tencentCloudHapi(app);
exports.handler = (event, context) => proxy(event, context);
