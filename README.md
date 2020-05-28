## Sablier Safe App

[Safe App](https://gnosis-safe.io/) for interacting with the Sablier protocol. Read more about Safe Apps [here](https://docs.gnosis.io/safe/docs/sdks_safe_apps/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## For developers

In order to allow the app to be used through the Gnosis safe ui, modify this file `safe-app/node_modules/react-scripts/config/webpackDevServer.config.js` by adding these lines:

```
headers: {
    "Access-Control-Allow-Origin": "\*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
},
```