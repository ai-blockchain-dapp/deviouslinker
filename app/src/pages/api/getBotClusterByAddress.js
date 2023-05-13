import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { address } = req.body;

    try {
      const botCluster = await prisma.botCluster.findFirst({
        where: {
          addresses: {
            some: {
              address,
            },
          },
        },
        include: {
          addresses: true,
        },
      });

      if (botCluster) {
        res.status(200).json(botCluster);
      } else {
        res.status(404).json({ error: 'BotCluster not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

