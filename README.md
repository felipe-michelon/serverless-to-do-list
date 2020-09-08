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

### Setting up the React app
To set up the react app, you need to enter it's directory, install it's dependencies, set the env vars, and run the build command, as the following:
```shell
# from the project root directory
cd src/todo-app
npm install
cp .env.sample .env

# after creating .env file, you need to fill every var before running the next command
npm run build
```

## Deploying

### Lambdas
To deploy the lambas, run:
```shell
serverless deploy
```

### React app
To deploy the React app, run:
```shell
serverless client deploy
```
**NOTE:** Remember that you will need to re-build the app **every time** you make a change, and want to deploy it again.

## Testing

To run lambdas tests, run:
```shell
sls invoke test
```

To run react app tests, enter the directory, start the server and run tests with cypress:
```shell
# from the project root directory
cd src/todo-app
npm start

# while the app is running, run this for testing on the command line:
npx cypress run

# while the app is running, run this for testing with the interface assistant:
npx cypress open
```

## License
[MIT-LICENSE](LICENSE)
