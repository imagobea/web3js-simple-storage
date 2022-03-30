// node -r dotenv/config scripts/deploy.js
const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

const web3 = new Web3(process.env.PROVIDER_URL);

const rootPath = path.resolve();
const compiledCodePath = path.join(rootPath, "compiled_code.json");
const compiledCodeSource = fs.readFileSync(compiledCodePath, "UTF-8");
const compiledCode = JSON.parse(compiledCodeSource);

async function getAccount() {
  let accounts = [];
  try {
    accounts = await web3.eth.getAccounts();
  } catch (error) {
    console.log("getAccount", error);
    process.exit(1);
  }
  return accounts[0];
}

async function deployContract(account) {
  const abi = compiledCode["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"];
  const bytecode = compiledCode["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"]["bytecode"]["object"];

  const contract = new web3.eth.Contract(abi);

  let deployedContract;
  try {
    deployedContract = await contract.deploy({data: bytecode}).send({from: account, gas: 1000000});
  } catch (error) {
    console.log("deployContract", error); // Error: The contract code couldn't be stored, please check your gas limit > https://ethereum.stackexchange.com/questions/60990/error-ganache-run-out-of-gas-works-in-remix-not-from-dapp
    process.exit(1);
  }
  return deployedContract.options;
}

async function main() {
  const accountAddress = await getAccount();
  console.log("Deploying from", accountAddress);

  const contract = await deployContract(accountAddress);
  console.log("Contract deployed at", contract.address);

  return contract;
}

main();

/*
  RPC Listening on 127.0.0.1:8545

  eth_accounts
  eth_getBlockByNumber
  eth_gasPrice
  eth_sendTransaction

    Transaction: 0x4063dac5960c8ddfd70add1f0c09a3d728dd13b4e5c8b933e6da62d29d802464
    Contract created: 0x8a419f67347849b9735559a77d45c926aa2ac894
    Gas usage: 366155
    Block number: 1
    Block time: Tue Mar 29 2022 16:30:03 GMT+0200 (Central European Summer Time)

  eth_getTransactionReceipt
  eth_getCode
*/
