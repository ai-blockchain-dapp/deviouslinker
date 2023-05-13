const csv = require('csv-parser');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function readCSVFile(filePath) {
  const uniqueAddresses = new Set();

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        uniqueAddresses.add(data.Sender);
        uniqueAddresses.add(data.Receiver);
      })
      .on('end', () => {
        resolve(uniqueAddresses);
      })
      .on('error', reject);
  });
}

async function main() {
  const uniqueAddresses = await readCSVFile('./prisma/seed/addresses.csv');
	const addressesData = Array.from(uniqueAddresses).map((address) => ({ address }))

  const botCluster = await prisma.botCluster.create({
    data: {
      imageUrl: 'https://example.com/image.jpg', // it should be put on IPFS
      addresses: {
        create: addressesData,
      },
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

