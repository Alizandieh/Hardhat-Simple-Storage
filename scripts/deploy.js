const { ethers, run, network } = require("hardhat");

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying the contract....");

  const contract = await simpleStorageFactory.deploy();
  // await contract.deploymentTransaction().wait(2);

  let favNumber = await contract.retrieve();
  console.log(`Favorite Number is: ${favNumber.toString()}`);

  console.log("Calling the contract store function....");
  const storeNumber = await contract.store("55");
  await storeNumber.wait(1);

  favNumber = await contract.retrieve();
  console.log(`New Favorite Number is: ${favNumber.toString()}`);

  let person = await contract.addPerson("Ali", 1234);
  await person.wait(1);
  let people = await contract.people(0);
  const formattedpeople = [people[0].toString(), people[1]];
  console.log(formattedpeople);

  let contractAddress = await contract.getAddress();
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await verify(contractAddress, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("This Contract is already verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
