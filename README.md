# Sablier Safe App

This Safe App brings real-time finance to [Gnosis Safe](https://gnosis-safe.io/) users by allowing them to use
the [Sablier](https://sablier.finance) platform. Learn more about Safe Apps [here](https://docs.gnosis.io/safe/docs/sdks_safe_apps/).

Sablier opens up the opportunity for organisations to pay and interact with each other in new ways without having to give custody of funds to a single member:

1. Vesting; streaming governance tokens to early investors.
2. "Continuous" payroll or freelancing
3. Subscriptions, paying for a product or a service in real-time.

## Usage :money_with_wings:

|                                                                                                                                                        |                                                                                                                                               |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="1604" alt="Create Stream Page" src="https://user-images.githubusercontent.com/15848336/85229771-aecf7100-b3e3-11ea-9e7a-09e61d1cb4c9.png"> | <img width="1604" alt="Dashboard" src="https://user-images.githubusercontent.com/15848336/85229785-bf7fe700-b3e3-11ea-8f57-7a79a8dbffea.png"> |

Using the Sablier Safe App you can:

- Create new streams.
- View details on your incoming and outgoing streams.
- Cancel streams as a sender.
- Withdraw from streams as a recipient.

## Deployments :earth_africa:

There are multiple ways to access the Safe App:

- On Gnosis Safe: https://gnosis-safe.io
- Vercel deployment: https://sablier-safe-app.now.sh/

The Vercel deployment will automatically update to the newest version of the Sablier safe app, however for additional
security you may want to use the production-ready version on the Gnosis UI.

### Alternatives

If you don't have a Gnosis Safe but would like to use Sablier, you can use the original interfaces:

- [pay.sablier.finance](https://pay.sablier.finance) for creating and cancelling streams.
- [app.sablier.finance](https://app.sablier.finance) for withdrawing from streams.

## Contributing :raising_hand_woman:

We highly encourage participation from the community to help shape the development of Sablier. If you are interested in
contributing or have any questions, ping us on [Discord](https://discord.gg/KXajCXC).

### Contributing

To start developing on the Sablier Safe App, first clone this repository and enter the new directory.

```bash
git clone https://github.com/paulrberg/sablier-safe-app.git
cd sablier-safe-app
```

You will need to create a `.env` file. We have provided `.env.example` as a template.

```bash
cp .env.example .env
```

Now, install the node dependencies and start the dev server:

```bash
yarn install
yarn start
```

The app will be hosted on `http://localhost:3000`.

### React App Rewired

In order to allow the Gnosis Safe UI to access the app while it's running on localhost, we need to edit the headers on the dev server (`node_modules/react-scripts/config/webpackDevServer.config.js`) to avoid CORS issues:

```json
headers: {
    "Access-Control-Allow-Origin": "\*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
},
```

We automate injecting these headers in to the server config through [react-app-rewired](https://github.com/timarney/react-app-rewired).
