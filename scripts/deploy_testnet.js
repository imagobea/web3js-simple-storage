// node -r dotenv/config scripts/deploy_testnet.js
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

function createContract() {
  const abi = compiledCode["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"];
  const bytecode = compiledCode["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"]["bytecode"]["object"];

  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;

  return contract;
}

async function main(private_key) {
  // Creating a signing account from a private key
  const signer = createSigner(private_key);
  console.log("Deploying from", signer.address);

  // Using the signing account to deploy the contract
  const contract = createContract();
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txHash) => {
      console.log("Mining deployment transaction ...");
      console.log(`https://rinkeby.etherscan.io/tx/${txHash}`);
    });

  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`);

  return deployedContract;
}

main(process.env.ACCOUNT_PRIVATE_KEY);

/*
  TODO - Alternatively
  1 Create transaction, aka tx - compiled code in tx.data
  2 Sign tx
  3 Broadcast tx
*/
