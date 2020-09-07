# Serverless to-do list

Managing a to-do list, without needing to host a server and ~paying~ maintaining it.

_This app is based on [serverless example aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)_

## Setup

The base requirements are:
- [Node](https://nodejs.org) v12.18.3
- [NPM](https://www.npmjs.com)

### Installing global dependencies

To install serverless framework, run:
```shell
npm install -g serverless
```
**NOTE:** the version used on this project was _1.82.0_.

### Installing local dependencies
To install local dependencies, run:
```shell
npm install
```

### AWS configuration
To run the app, you will need to configure both AWS access key and secret.
As written on [serverless documentation](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#quick-setup), this app was built to use `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables.

## Deploying

To deploy the app, run:
```shell
serverless deploy
```

## Testing

To run all tests, run:
```shell
sls invoke test
```

## License
[MIT-LICENSE](LICENSE)
