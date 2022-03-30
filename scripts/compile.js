const fs = require("fs");
const path = require("path");
const solc = require("solc");

// Locate and load contract
const rootPath = path.resolve();
const contractPath = path.join(rootPath, "contracts", "SimpleStorage.sol");
const contractSource = fs.readFileSync(contractPath, "UTF-8");

// Prep the JSON-input-output interface
// Note: the contract version pragma has to be aligned with the version of the solc package 
const input = {
  language: "Solidity",
  sources: {"SimpleStorage.sol": {"content": contractSource}},
  settings: { "outputSelection": {"*": {"*": ["*"]}}},
};
const output = solc.compile(JSON.stringify(input));

// Save the compiled code to a file
fs.writeFileSync(path.join(rootPath, "compiled_code.json"), output, "utf8");
