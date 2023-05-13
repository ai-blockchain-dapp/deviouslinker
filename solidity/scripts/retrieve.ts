const { ethers } = require("hardhat");

async function retrieveDataByAddress(addressToRetrieve) {
  const BotRepo = await ethers.getContractFactory("BotRepo");
  const signer = await ethers.getSigner();

  const contractAddress = "0x65d8A5fa2228C1Bca5f9Cfd0A4Cae55453648EdA";
  const botRepo = await BotRepo.attach(contractAddress).connect(signer);

  const isBot = await botRepo.isBot(addressToRetrieve);
  const score = await botRepo.getScore(addressToRetrieve);

  console.log(`Address: ${addressToRetrieve}`);
  console.log(`Is Bot: ${isBot}`);
  console.log(`Score: ${score}`);
}

const addressToRetrieve = "0x10f4a785f458bc144e3706575924889954946639";

retrieveDataByAddress(addressToRetrieve)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

