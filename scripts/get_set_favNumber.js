// node -r dotenv/config scripts/get_set_favNumber.js
const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

const web3 = new Web3(process.env.PROVIDER_URL);

const rootPath = path.resolve();
const compiledCodePath = path.join(rootPath, "compiled_code.json");
const compiledCodeSource = fs.readFileSync(compiledCodePath, "UTF-8");
const compiledCode = JSON.parse(compiledCodeSource);

async function getFavNumber(simpleStorage) {
  let favNumber;
  try {
    favNumber = await simpleStorage.methods.getFavNumber().call();
  } catch (error) {
    console.log("getFavNumber", error);
    process.exit(1);
  }
  return favNumber;
}

async function setFavNumber(favNumber, address, simpleStorage) {
  let txReceipt;
  try {
    txReceipt = await simpleStorage.methods.setFavNumber(favNumber).send({from: address});
  } catch (error) {
    console.log("setFavNumber", error);
    process.exit(1);
  }
  return txReceipt;
}

async function main(abi, contractAddress, fromAddress, newFavNumber) {
  // Load contract
  let simpleStorage;
  try {
    simpleStorage = await new web3.eth.Contract(abi, contractAddress);
  } catch (error) {
    console.log("Load contract failed!", error);
    process.exit(1);
  }

  // Call getFavNumber - should return 0 at genesis
  let favNumber = await getFavNumber(simpleStorage);
  console.log("t0 favNumber >>", favNumber);

  // Update `favNumber`, i.e. call setFavNumber
  const txReceipt = await setFavNumber(newFavNumber, fromAddress, simpleStorage);
  console.log(txReceipt);

  // Call getFavNumber - should return `newFavNumber`
  favNumber = await getFavNumber(simpleStorage);
  console.log("t1 favNumber >>", favNumber);

  return simpleStorage;
}

const abi = compiledCode["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"];
const contractAddress = "0xaa29029a98a1627bc6cb221f78ce4b9af2526187";
const fromAddress = "0x09893456038940bd3248354cbf4962702c373495";
const newFavNumber = 777;

main(abi, contractAddress, fromAddress, newFavNumber);

/*
  eth_call
  eth_getBlockByNumber
  eth_gasPrice
  eth_sendTransaction

    Transaction: 0x0177ec4b881fd0194b6680285b4e1e614e312700bbfb4ca84e5eb9ff7a73d063
    Gas usage: 26468
    Block number: 3
    Block time: Wed Mar 30 2022 19:06:17 GMT+0200 (Central European Summer Time)

  eth_getTransactionReceipt
  eth_call
*/
