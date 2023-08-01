import { Box } from "@chakra-ui/react";

import "./App.css";
import Body from "./components/Body";

function App() {
  return (
    <>
      <Box
        height={"100vh"}
        backgroundColor={"#1F2833"}
        w={"100vw"}
        color={"#C5C6C7"}
      >
        <Body />
      </Box>
    </>
  );
}

export default App;
