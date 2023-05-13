const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const BotRepo = await ethers.getContractFactory("BotRepo");
  const botRepo = await BotRepo.deploy();

  console.log("BotRepo deployed to:", botRepo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

