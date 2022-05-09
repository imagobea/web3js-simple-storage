# web3js-simple-storage

*A repository for compiling, deploying and calling smart contracts using [web3.js](https://web3js.readthedocs.io/en/v1.7.1/index.html)*.

Inspired by [Patrick Collins' blockchain course](https://www.freecodecamp.org/news/learn-solidity-blockchain-and-smart-contracts-in-a-free/) [1], I decided to recreate Python lessons with JavaScript.

**This is Lesson 4: Web3 Simple Storage**.

## Getting started

Run the commands below to clone the repository and install the requirements.

**Note that you may need a different [version of solc.js](#about-solc)**.

```bash
git clone git@github.com:imagobea/web3js-simple-storage.git
cd web3js-simple-storage.git
npm install
```

Also needed:

- [Node.js](https://nodejs.org/en/download/)
- [Ganache](https://github.com/trufflesuite/ganache) for spinning a local blockchain
- An Ethereum blockchain provider, like [Infura](https://infura.io/) (plus an Ethereum account e.g. using Metamask, and some test Ether, e.g. from Rinkeby faucet)

## About Lesson 4 Simple Storage

I recommend watching the lesson on Youtube, but this is pretty much what covers:

### 1 Compiling smart contracts

#### About solc

The [solc.js](https://github.com/ethereum/solc-js) library is used to compile Solidity, hence it has to be compatible with [the version of your contract](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragmas). Update the `package.json` file as needed before installing the requirements, or update these.

#### Execution

Place your contract into the `contracts` folder. Update `scripts/compile.js` as necessary. Run:

```bash
node -r dotenv/config scripts/compile.js
```

This will create a `compiled_code.json` file at root. This includes:

- The contract **bytecode**, required for deployment
- The **Application Binary Interface (ABI)**, required for contract interactions

### 2 Deploying smart contracts

[Set up web3.js to use the Ethereum blockchain in JavaScript](https://ethereum.org/en/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) [2].

### 3 Calling smart contracts

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
