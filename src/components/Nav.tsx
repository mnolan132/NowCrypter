import { Box, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";

export const Nav = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} py={"10px"}>
        <Image src={logo} w={"250px"}></Image>
      </Box>
    </>
  );
};
