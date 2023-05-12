import Head from "next/head";
import Image from "next/image";
import React from "react";
import logo from "../../public/DEVIOUSLINKER.png";
import { Poppins } from "next/font/google";
import { Box, Typography, TextField, Button } from "@mui/material";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "600"],
});

export default function Home() {
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
                  placeholder="Input blockchain address..." />
              </Box>
              <Button className="btn-style">Send</Button>
            </form>
          </Box>
          <Box className="result">
            <Typography className="style2 pt-6">result will be here</Typography>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

