require("@nomiclabs/hardhat-ethers");

const { projectId, mnemonic } = require("./secrets.json");

module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: { mnemonic: mnemonic },
    },
  },
};

