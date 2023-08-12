const { Web3 } = require("web3");
const ganache = require("ganache");
const assert = require("assert");
const { contractAbi, contractBytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts = [];
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.personal.getAccounts();

  // Use one of those accounts to deploy our contract
  inbox = await new web3.eth.Contract(contractAbi)
    .deploy({ data: contractBytecode, arguments: ["Hi, there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
