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

## Deployments :earth_africa:

There are multiple ways to access the Sablier safe app, you may use either of the below URLs:

* Vercel deployment: https://sablier-safe-app.now.sh/
* IPFS deployment: https://ipfs.io/ipfs/QmabPEk7g4zaytFefp6fE4nz8f85QMJoWmRQQZypvJViNG/

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
