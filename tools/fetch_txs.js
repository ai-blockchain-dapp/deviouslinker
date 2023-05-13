require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
const address = '0x05337Ba1598124C1539D2A1052EFdc262440F352'; // example
const apiKey = process.env.POLYGONSCAN_API_KEY;

async function fetchTransactions() {
  try {
    const response = await axios.get(`https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`);

    if (response.data.status === '1') {
      const transactionList = response.data.result;

      const csvData = [
        'blockNumber,timeStamp,nonce,from,to,value,isError,methodId,functionName',
      ];

      transactionList.forEach((transaction) => {
        const {
          blockNumber,
          timeStamp,
          nonce,
          from,
          to,
          value,
          isError,
          methodId,
          functionName,
        } = transaction;

        const formattedValue = ethers.utils.formatEther(value);

        const row = `${blockNumber},${timeStamp},${nonce},${from},${to},${formattedValue},${isError},${methodId},"${functionName}"`;
        csvData.push(row);
      });

      const csvContent = csvData.join('\n');
      fs.writeFileSync('transactions.csv', csvContent);
      console.log('CSV file created!');
    } else {
      throw new Error('Failed to fetch transactions');
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}


fetchTransactions().catch(console.error);
