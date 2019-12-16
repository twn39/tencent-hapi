[![Serverless Components](https://s3.amazonaws.com/assets.github.serverless/readme-serverless-components-3.gif)](http://serverless.com)

Serverless tencent hapi component.

### Install

1. global install serverless

```
npm install -g serverless
```

2. install hapi

```
npm install @hapi/hapi --save
```

### Configure

1. create `app.js` file:

```js
const Hapi = require('@hapi/hapi');

const app = Hapi.server({ port: 80 });
app.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return h.response({
            hello: 'hapi',
        });
    },
});

module.exports = app;
```

2. create serverless configure file:

```yml
# serverless.yml

fastify:
  component: '@twn39/tencent-hapi'
  inputs:
    region: ap-shanghai
```

### Deploy

```
sls --debug
```

### Have fun !
