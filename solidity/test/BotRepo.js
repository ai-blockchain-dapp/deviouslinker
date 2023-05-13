const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BotRepo", function () {
  let botRepo;

  beforeEach(async function () {
    const BotRepo = await ethers.getContractFactory("BotRepo");
    botRepo = await BotRepo.deploy();
    await botRepo.deployed();
  });

  it("should register a bot and get its data", async function () {
    const address = "0x1234567890123456789012345678901234567890";
    const isBot = true;
    const score = ethers.BigNumber.from("9920");

    await botRepo.register(address, isBot, score);

    expect(await botRepo.isBot(address)).to.equal(isBot);
    expect((await botRepo.getScore(address)).toNumber()).to.equal(score.toNumber());
  });
});

