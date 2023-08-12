const { Web3 } = require("web3");
const ganache = require("ganache");
const assert = require("assert");
const { contractAbi, contractBytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts = [];
let inbox;
const INITIAL_STRING = "Hi, there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.personal.getAccounts();

  // Use one of those accounts to deploy our contract
  inbox = await new web3.eth.Contract(contractAbi)
    .deploy({ data: contractBytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    const newMessage = "It's an apple";
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });

    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
