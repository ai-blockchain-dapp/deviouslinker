const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const BotRepo = await ethers.getContractFactory("BotRepo");

  // Set the gas price (increase it from 0 to a higher value)
  const overrides = {
    gasPrice: ethers.utils.parseUnits("1", "gwei"), // Set a higher gas price here
  };

  const botRepo = await BotRepo.deploy(overrides);

  console.log("BotRepo deployed to:", botRepo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
