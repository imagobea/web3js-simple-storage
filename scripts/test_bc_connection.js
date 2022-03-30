// node -r dotenv/config scripts/test_bc_connection.js
const Web3 = require("web3");

// const web3 = new Web3(process.env.PROVIDER_URL);
const web3 = new Web3(process.env.RINKEBY_PROVIDER_URL);

const getBlockNumber = async () => {
  const blockNumber = await web3.eth.getBlockNumber();
  console.log("getBlockNumber", blockNumber);
};

getBlockNumber();
