// node -r dotenv/config scripts/get_set_favNumber_testnet.js
const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

const web3 = new Web3(process.env.RINKEBY_PROVIDER_URL);

const rootPath = path.resolve();
const compiledCodePath = path.join(rootPath, "compiled_code.json");
const compiledCodeSource = fs.readFileSync(compiledCodePath, "UTF-8");
const compiledCode = JSON.parse(compiledCodeSource);

function createSigner(private_key) {
  const signer = web3.eth.accounts.privateKeyToAccount(private_key);
  web3.eth.accounts.wallet.add(signer);

  return signer;
}

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

async function setFavNumber(private_key, favNumber, simpleStorage) {
  console.log(simpleStorage);
  const signer = createSigner(private_key);

  let tx, txReceipt;
  try {
    tx = simpleStorage.methods.setFavNumber(favNumber);
    txReceipt = await tx
      .send({
        from: signer.address,
        gas: await tx.estimateGas(),
      })
      .once("transactionHash", (txHash) => {
        console.log("Mining deployment transaction ...");
        console.log(`https://rinkeby.etherscan.io/tx/${txHash}`);
      });
  } catch (error) {
    console.log("setFavNumber", error);
    process.exit(1);
  }
  return txReceipt;
}

async function main(abi, contractAddress, private_key, newFavNumber) {
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
  // const txReceipt = await setFavNumber(private_key, newFavNumber, simpleStorage);
  // console.log(`Mined in block ${txReceipt.blockNumber}`);

  // Call getFavNumber - should return `newFavNumber`
  // favNumber = await getFavNumber(simpleStorage);
  // console.log("t1 favNumber >>", favNumber);

  return simpleStorage;
}

const abi = compiledCode["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"];
const contractAddress = process.env.RINKEBY_DEPLOYED_CONTRACT;
const newFavNumber = 666;

main(abi, contractAddress, process.env.ACCOUNT_PRIVATE_KEY, newFavNumber);
