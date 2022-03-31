# web3js-simple-storage

*A repository for compiling, deploying and calling smart contracts using web3.js*.

Inspired by [Patrick Collins' blockchain course](https://www.freecodecamp.org/news/learn-solidity-blockchain-and-smart-contracts-in-a-free/)[1], I decided to recreate Python lessons with JavaScript.

This is **Lesson 4: Web3.py Simple Storage**, using [web3.js](https://web3js.readthedocs.io/en/v1.7.1/index.html) instead.

## Getting started

Run the commands below to clone the repository and install the requirements.
**Note that you may need a different version of [solc.js](https://github.com/ethereum/solc-js)**.

The `solc` library is used to compile Solidity, hence it has to be compatible with [the version of your contract](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragmas). Update the `package.json` file as needed before installing the requirements, or just re-install these. 

```
git clone git@github.com:imagobea/web3js-simple-storage.git
cd web3js-simple-storage.git
npm install
```

Also needed:

- Node.js
- [Ganache](https://github.com/trufflesuite/ganache) for spinning a local blockchain
- An Ethereum blockchain provider, like [Infura](https://infura.io/) (plus an Ethereum Account e.g. using Metamask, and some test Ether, e.g. from Rinkeby faucet)

## About Lesson 4 Simple Storage

I recommend that you watch the lesson from Youtube, but this is pretty much what I did (and you should be able to achieve):

### 1) Compiling smart contracts

TBC

### 2) Deploying smart contracts

[Set up web3.js to use the Ethereum blockchain in JavaScript](https://ethereum.org/en/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) [2].

### 3) Calling smart contracts

TBC

## Repo room for improvement

- Network and URL provider environment vars
- Environment vars management in general
- Better error handling and logging - *a classic!*
- Flexible scripts to allow faster interactions with contracts other than SimpleStorage.sol

## Nice to have

- [ ] Explore alternative ways of creating and broadcasting signed transactions (see scripts/deploy_testnet.js, bottom)
- [ ] Improve deployment scripts for publishing verified contracts

<hr/>

## Other References

[1] [Solidity, Blockchain, and Smart Contract Course - GitHub](https://github.com/smartcontractkit/full-blockchain-solidity-course-py#lesson-4-web3py-simple-storage)

[2] [JavaScript API Libraries](https://ethereum.org/en/developers/docs/apis/javascript/)
