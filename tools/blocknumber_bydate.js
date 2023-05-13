require('dotenv').config();

const axios = require('axios');
const apiKey = process.env.POLYGONSCAN_API_KEY;

async function getBlockNumberFromDate(date) {
  const timestamp = Math.floor(date.getTime() / 1000);

  try {
    const response = await axios.get(`https:/api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`);

    if (response.data.status === '1') {
      const blockNumber = parseInt(response.data.result, 10);
      return blockNumber;
    } else {
      throw new Error('Failed to retrieve block number');
    }
  } catch (error) {
    console.error(error);
  }
}

// Example usage: Get block number for Jan 6, 2022
const date = new Date('2022-01-06');
getBlockNumberFromDate(date)
  .then((blockNumber) => {
    console.log('Block Number:', blockNumber);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

