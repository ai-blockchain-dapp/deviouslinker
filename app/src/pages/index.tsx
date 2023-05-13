import Head from "next/head";
import Image from "next/image";
import { useState } from 'react';
import logo from "../../public/DEVIOUSLINKER.png";
import { Poppins } from "next/font/google";
import { Box, Typography, TextField, Button } from "@mui/material";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "600"],
});

export default function Home() {
  const [address, setAddress] = useState('');
  const [botCluster, setBotCluster] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/getBotClusterByAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (response.ok) {
        const data = await response.json();
        setBotCluster(data);
      } else {
        setBotCluster(null);
      }
    } catch (error) {
      console.error(error);
      setBotCluster(null);
    }
  };

  return (
    <main className={` ${poppins.className} `}>
      <header className="header flex items-center justify-between">
        <Box className="flex items-center gap-16">
          <Box className="logo">
            <Image src={logo} alt="logo" className="block img-full mx-auto" />
          </Box>
        </Box>
      </header>
      <Box className="mt-8 flex items-start gap-10">
        <Box className="main-panel w-full">
          <Typography className="pt-4 text-white text-opacity-[.68] max-w-[880px]">
You can check any address that is associated with bot activities or multi-account usage for NFT or gaming projects. We will identify the address and gather more data about it.
          </Typography>
          <Box className="mt-8">
            <form action="#" className="flex items-end gap-6 w-full">
              <Box className="w-full">
                <Typography className="address-form">Address</Typography>
                <TextField
                  id="standard-basic"
                  label=""
                  variant="standard"
                  className="input w-full"
                  placeholder="Input blockchain address..."
                  onChange={(e) => setAddress(e.target.value)} 
                 />
              </Box>
              <Button className="btn-style" onClick={handleSearch}>Search</Button>
            </form>
          </Box>
          <Box className="result">
            <Typography className="style2 pt-6">result will be here</Typography>
            {botCluster ? (
              <div>
                <h2>BotCluster Details:</h2>
                <p>Image URL: {botCluster.imageUrl}</p>
                <h3>Addresses:</h3>
                <ul>
                  {botCluster.addresses.map((address) => (
                    <li key={address.id}>{address.address}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No BotCluster found.</p>
            )}
          </Box>
        </Box>
      </Box>
    </main>
  );
};
