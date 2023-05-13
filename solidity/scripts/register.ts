const { ethers } = require("hardhat");

async function registerMultipleRecords() {
  const BotRepo = await ethers.getContractFactory("BotRepo");
  const signer = await ethers.getSigner();

  const contractAddress = "0x65d8A5fa2228C1Bca5f9Cfd0A4Cae55453648EdA";
  const botRepo = await BotRepo.attach(contractAddress);

  const records = [
    { address: "0x664e7efeb7431125b583543634d6f9df0ccd78ea", isBot: true, score: 9900 },
    { address: "0x10f4a785f458bc144e3706575924889954946639", isBot: true, score: 9900 },
    { address: "0xBcb81F16053143fF2cE19C59a6eFa1B6C29EEFF0", isBot: false, score: 100 },
  ];

  // Register each record
  for (const record of records) {
    const { address, isBot, score } = record;
    await botRepo.connect(signer).register(address, isBot, score);
    console.log(`Registered record for address ${address}`);
  }
}

registerMultipleRecords()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

