// Purpose of this file is to look into contracts directory and compile each of the solidity contracts that exist inside of it.
// This will generate interface(ABI - communication layer between the solidity world and the JavaScript world)
// This will also generate bytecode which will be deployed to Ethereum network

const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxContractPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const contractSource = fs.readFileSync(inboxContractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contractBytecode =
  output.contracts["Inbox.sol"]["Inbox"].evm.bytecode.object;
const contractAbi = JSON.parse(output.contracts["Inbox.sol"]["Inbox"].metadata)
  .output.abi;

module.exports = { contractBytecode, contractAbi };
