<p align="center"><img src="https://i.imgur.com/q6UHTt1.png" width="280px"/></p>

<p align="center">Sablier is the protocol for real-time finance on Ethereum. Read this <a href="https://medium.com/@PaulRBerg/the-protocol-for-real-time-finance-on-ethereum-5a5350db16ae" target="_blank">article</a> to find out more about what we're up to.</p>

<p align="center">
  <a href="https://prettier.io">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Styled with Prettier">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen Friendly">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-008033.svg" alt="License: MIT">
  </a>
</p>

---

## Sablier Safe App

The Sablier Safe App brings real-time finance to [Gnosis Safe](https://gnosis-safe.io/) users by allowing them to use the [Sablier](https://sablier.finance) platform.

This opens up the opportunity for organisations to pay and interact with each other in new ways without having to give custody of funds to a single member:

1. "Continuous" payroll or freelancing
2. Subscriptions, paying for a product or a service in real-time
3. Investing, continuous ICOs; imagine a DAO using a Safe to stream DAI to a founder and the founder streaming equity tokens or social money back

Read more about Safe Apps [here](https://docs.gnosis.io/safe/docs/sdks_safe_apps/).

## Usage :money_with_wings:

|                                                    |                                           |
| :------------------------------------------------: | :---------------------------------------: |
| <img width="1604" alt="Create Stream Page" src="https://user-images.githubusercontent.com/15848336/85229771-aecf7100-b3e3-11ea-9e7a-09e61d1cb4c9.png"> | <img width="1604" alt="Dashboard" src="https://user-images.githubusercontent.com/15848336/85229785-bf7fe700-b3e3-11ea-8f57-7a79a8dbffea.png"> |

Using the Sablier Safe app you can:

- Create new streams
- View details on your outgoing streams
- Cancel streams in progress

**Important:** All streams created using the Sablier Safe app are set to start 1 hour from when the stream creation form is submitted. For the stream to be successful, you must collect the number of confirmations required for your particular Safe before the stream is due to start.

> Note: We do not support withdrawing from streams which are being sent to your Safe. Please do not use a Safe as a recipient of a Sablier stream. We have omitted implementing support for withdrawals as they will be unnecessary after the Sablier V2 upgrade later this year. Instead funds will directly accrue in your safe.

## Deployments :earth_africa:

There are multiple ways to access the Sablier safe app, you may use either of the below URLs:

- Vercel deployment: https://sablier-safe-app.now.sh/
- IPFS deployment: https://ipfs.io/ipfs/QmabPEk7g4zaytFefp6fE4nz8f85QMJoWmRQQZypvJViNG/

The Vercel deployment will automatically update to the newest version of the Sablier safe app, however for additional security you may also access the app using IPFS.

We recommend that you use the IPFS version.

## Other ways to use Sablier :hammer_and_pick:

If you don't have a Gnosis Safe but would like to use Sablier, head to [pay.sablier.finance](https://pay.sablier.finance) to create streams and
[app.sablier.finance](https://app.sablier.finance) to withdraw from streams. You'll need an Ethereum wallet and some ERC20 tokens to interact
with the dapps.

## Contributing :raising_hand_woman:

We highly encourage participation from the community to help shape the development of Sablier. If you are interested in contributing or have any questions, ping us on [Twitter](https://twitter.com/sablierhq) or [Telegram](https://t.me/sablier).

### Getting set up

To start developing on the Sablier Safe app, first clone this repository and enter the new directory.

```bash
git clone https://github.com/TomAFrench/sablier-safe-app.git
cd sablier-safe-app
```

Before getting started you will need to create a `.env` file. We have provided `.env.example` as a template.

```bash
cp .env.example .env
```

Finally install any dependencies and start the dev server

```bash
yarn install
yarn start
```

The app will then be hosted on `http://localhost:3002`. By default the app will expect an injected web3 provider such as metamask; if you want to interact with the app through the Gnosis UI you'll need to set the `REACT_APP_LOCAL_WEB3_PROVIDER` environment variable to `false`.

### react-app-rewired

In order to allow the Gnosis Safe UI to access the app while it's running on localhost we need to edit the headers on the dev server (`node_modules/react-scripts/config/webpackDevServer.config.js`) to avoid CORS issues:

```
headers: {
    "Access-Control-Allow-Origin": "\*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
},
```

We automate injecting these headers in to the server config through [react-app-rewired](https://github.com/timarney/react-app-rewired).
