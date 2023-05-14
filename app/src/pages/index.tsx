import Head from "next/head";
import Image from "next/image";
import { useState } from 'react';
import logo from "../../public/DEVIOUSLINKER.png";
import { Poppins } from "next/font/google";
import { Box, Typography, TextField, Button, Tooltip, Grid, Dialog } from "@mui/material";
import AirStack from "../components/AirStack";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "600"],
});

function AddressList({ addresses }) {
  return (
    <ul>
      {addresses.map((address) => (
        <li key={address.id}>{address.address}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [address, setAddress] = useState('');
  const [botCluster, setBotCluster] = useState(null);
  const [searched, setSearched] = useState(null);

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
      setSearched(true);
    } catch (error) {
      console.error(error);
      setBotCluster(null);
    }
  };

  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseImage = () => {
    setIsImageOpen(false);
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
          <Box className="mt-8">
            {botCluster ? (
              <Box className="w-full">
                <Typography className="address-form">Bot Cluster</Typography>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid item>
                        <Typography className="pt-4 text-white text-opacity-[.68] max-w-[880px]">
                          <Tooltip title={<AddressList addresses={botCluster.addresses} />} arrow>
                          <span style={{color: '#149C6B', fontWeight: 'bold' }}>{botCluster.addresses.length}</span>
                        </Tooltip>
                        &nbsp;addresses found in the cluster
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Image
                        src={`https://ipfs.io/ipfs/${botCluster.ipfsCid}/${botCluster.filename}`}
                        width="450"
                        height="300"
                        alt="cluster image"
                        className="block img-full mx-auto"
                        style={{ margin: '0 auto', cursor: 'pointer' }}
                        onClick={handleImageClick}
                      />
                      <Dialog open={isImageOpen} onClose={handleCloseImage} maxWidth="false">
                        <Image
                          src={`https://ipfs.io/ipfs/${botCluster.ipfsCid}/${botCluster.filename}`}
                          alt="cluster image"
                          width="1189"
                          height="790"
                        />
                      </Dialog>
                    </Grid>
                  </Grid>
              </Box>
            ) : (
              searched ? (
                <>
                <p>No BotCluster found.</p>
                <AirStack address={address} />
                </>
              ) : (
                <p></p>
              )
            )}
          </Box>
        </Box>
      </Box>
    </main>
  );
};
