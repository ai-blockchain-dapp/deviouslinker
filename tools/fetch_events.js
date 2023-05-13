const { ethers } = require('ethers');
const fs = require('fs');

const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');

const contractAddress = '0x6e5Fa679211d7F6b54e14E187D34bA547c5d3fe0'; // SFF contract
const methodId = '0xbe35fe23c13a419d565edccb8c8bdedc160c5b9a82873e431b545080d6f3c688'; // FarmSynced

async function fetchEvents() {
  // Set the desired block range
  const startBlock = 23385990; // Jan 6, 2022
  const endBlock = 23420821; // Jan 7, 2022

  const filter = {
    address: contractAddress,
    topics: [methodId],
  };

  const data = [];

  for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
    setTimeout(async () => {
      try {
        filter.fromBlock = blockNumber;
        filter.toBlock = blockNumber;

        const logs = await provider.getLogs(filter);

        logs.forEach((log) => {
          try {
            const paddedAddress = log.topics[1];
            const normalizedAddress = '0x' + paddedAddress.slice(-40);
            const row = `${blockNumber},${normalizedAddress}`;
            data.push(row);
            console.log(blockNumber, normalizedAddress);
          } catch (error) {
            console.error('Error decoding event:', error);
            console.log('Raw log:', log);
          }
        });
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    }, 1000 * (blockNumber - startBlock)); // Delay of 1000ms per block
  }

  // Wait for all logs to be processed
  await new Promise((resolve) => setTimeout(resolve, (endBlock - startBlock + 1) * 1000));

  const csvContent = data.join('\n');
  fs.writeFileSync('output.csv', csvContent);
  console.log('CSV file created!');
}

fetchEvents().catch(console.error);
