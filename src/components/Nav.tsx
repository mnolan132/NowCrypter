import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

export const Nav = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} py={"10px"}>
        <Image src="src\assets\logo.png" w={"250px"}></Image>
      </Box>
    </>
  );
};
