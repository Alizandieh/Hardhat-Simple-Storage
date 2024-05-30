const { ethers, run, network } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory, contract;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    contract = await simpleStorageFactory.deploy();
  });

  it("Should strat with the FavNumber of 0", async function () {
    let favNumber = await contract.retrieve();
    assert.equal(favNumber.toString(), "0");
  });
  it("Should update when we call store function", async function () {
    const storeNumber = await contract.store("55");
    await storeNumber.wait(1);
    favNumber = await contract.retrieve();
    assert.equal(favNumber.toString(), "55");
  });
  it("Should add a person into the array when we call addPerson function", async function () {
    let person = await contract.addPerson("Ali", 12334);
    await person.wait(1);
    const people = await contract.people(0);
    const formattedpeople = [people[0].toString(), people[1]];
    expect(formattedpeople).to.deep.equal(["12334", "Ali"]);
  });
});
